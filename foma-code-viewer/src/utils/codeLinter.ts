import { syntaxTree } from '@codemirror/language';
import type { Diagnostic } from '@codemirror/lint';
import type { EditorView } from '@codemirror/view';

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

function validateHtmlTags(text: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const tagRegex = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z0-9-]+)([^>]*)(\/)?>/g;
  let match;
  const stack: { tag: string; from: number; to: number }[] = [];

  while ((match = tagRegex.exec(text)) !== null) {
    if (match[0].startsWith('<!--')) continue;

    const [fullTag, isClosing, tagName, _attrs, isSelfClosing] = match;
    const lower = tagName.toLowerCase();
    const from = match.index;
    const to = from + fullTag.length;

    if (VOID_TAGS.has(lower) || isSelfClosing === '/') {
      continue;
    }

    if (isClosing) {
      if (stack.length === 0) {
        diagnostics.push({
          from,
          to,
          severity: 'error',
          message: `Лишний закрывающий тег </${tagName}> (нет открывающего <${tagName}>)`,
        });
      } else {
        const last = stack[stack.length - 1];
        if (last.tag.toLowerCase() === lower) {
          stack.pop();
        } else {
          const idx = stack.map((s) => s.tag.toLowerCase()).lastIndexOf(lower);
          if (idx !== -1) {
            for (let i = stack.length - 1; i > idx; i--) {
              diagnostics.push({
                from: stack[i].from,
                to: stack[i].to,
                severity: 'error',
                message: `Тег <${stack[i].tag}> не закрыт перед </${tagName}>`,
              });
            }
            stack.splice(idx);
          } else {
            diagnostics.push({
              from,
              to,
              severity: 'error',
              message: `Неожиданный закрывающий тег </${tagName}> (ожидался </${last.tag}>)`,
            });
          }
        }
      }
    } else {
      stack.push({ tag: tagName, from, to });
    }
  }

  for (const unclosed of stack) {
    diagnostics.push({
      from: unclosed.from,
      to: unclosed.to,
      severity: 'error',
      message: `Тег <${unclosed.tag}> не закрыт`,
    });
  }

  return diagnostics;
}

function validateCssBraces(text: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const braceStack: number[] = [];
  let inString: string | null = null;
  let inComment = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inComment) {
      if (ch === '*' && next === '/') {
        inComment = false;
        i++;
      }
      continue;
    }

    if (ch === '/' && next === '*') {
      inComment = true;
      i++;
      continue;
    }

    if (inString) {
      if (ch === inString && text[i - 1] !== '\\') {
        inString = null;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = ch;
      continue;
    }

    if (ch === '{') {
      braceStack.push(i);
    } else if (ch === '}') {
      if (braceStack.length === 0) {
        diagnostics.push({
          from: i,
          to: i + 1,
          severity: 'error',
          message: 'Лишняя закрывающая фигурная скобка }',
        });
      } else {
        braceStack.pop();
      }
    }
  }

  for (const pos of braceStack) {
    diagnostics.push({
      from: pos,
      to: pos + 1,
      severity: 'error',
      message: 'Не закрыта фигурная скобка {',
    });
  }

  return diagnostics;
}

function validateJsCode(text: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  try {
    new Function(text);
  } catch (err: any) {
    if (err instanceof SyntaxError) {
      let errorLine = -1;
      const stack = err.stack || '';
      const match = stack.match(/<anonymous>:(\d+):(\d+)/);
      if (match) {
        errorLine = parseInt(match[1], 10) - 2;
      }

      let from = 0;
      let to = Math.min(10, text.length);

      if (errorLine > 0) {
        const lines = text.split('\n');
        let offset = 0;
        for (let l = 0; l < lines.length; l++) {
          if (l === errorLine - 1) {
            from = offset;
            to = offset + lines[l].length;
            break;
          }
          offset += lines[l].length + 1;
        }
      }

      diagnostics.push({
        from,
        to: Math.max(to, from + 1),
        severity: 'error',
        message: `Синтаксическая ошибка JS: ${err.message}`,
      });
    }
  }
  return diagnostics;
}

function deduplicateDiagnostics(items: Diagnostic[]): Diagnostic[] {
  const seen = new Set<string>();
  const result: Diagnostic[] = [];
  for (const item of items) {
    const key = `${item.from}-${item.to}-${item.message}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

export function createLinter(lang: 'html' | 'css' | 'js') {
  return (view: EditorView): Diagnostic[] => {
    const doc = view.state.doc;
    const text = doc.toString();
    if (!text.trim()) return [];

    const diagnostics: Diagnostic[] = [];

    // 1. Traverse Lezer syntax tree for native parser error nodes
    const tree = syntaxTree(view.state);
    tree.iterate({
      enter: (node) => {
        if (node.type.isError) {
          let from = node.from;
          let to = node.to;
          if (from === to) {
            from = Math.max(0, from - 1);
            to = Math.min(doc.length, to + 1);
          }
          const snippet = text.slice(from, to).trim();
          let message = 'Синтаксическая ошибка';
          if (lang === 'html') {
            message = 'Синтаксическая ошибка в HTML: незакрытый или некорректный тег/атрибут';
          } else if (lang === 'css') {
            message = 'Синтаксическая ошибка в CSS: проверьте фигурные скобки, двоеточия или точки с запятой';
          } else if (lang === 'js') {
            message = 'Синтаксическая ошибка в JavaScript: неожиданный символ или незавершенная конструкция';
          }

          diagnostics.push({
            from,
            to: Math.max(to, from + 1),
            severity: 'error',
            message: snippet ? `${message} («${snippet}»)` : message,
          });
        }
      },
    });

    // 2. Language-specific semantic and structure checks
    if (lang === 'html') {
      diagnostics.push(...validateHtmlTags(text));
    } else if (lang === 'css') {
      diagnostics.push(...validateCssBraces(text));
    } else if (lang === 'js') {
      diagnostics.push(...validateJsCode(text));
    }

    return deduplicateDiagnostics(diagnostics);
  };
}
