import { useRef, useEffect, useState } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { abbreviationTracker, expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { oneDark } from '@codemirror/theme-one-dark';
import { RotateCcw, Rows, Square, X, Wand2, WrapText } from 'lucide-react';
import { linter, lintGutter } from '@codemirror/lint';
import type { CodeFiles } from '../../types/lesson';
import { formatCode } from '../../utils/formatCode';
import { createLinter } from '../../utils/codeLinter';
import './CodeEditor.css';

type TabKey = 'html' | 'css' | 'js';

const langExtensions = {
  html: () => html(),
  css: () => css(),
  js: () => javascript(),
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'html', label: 'index.html' },
  { key: 'css', label: 'style.css' },
  { key: 'js', label: 'main.js' },
];

interface SingleEditorPaneProps {
  id: string;
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  code: CodeFiles;
  onCodeChange: (lang: keyof CodeFiles, value: string) => void;
  onFormat?: () => void;
  theme: 'dark' | 'light';
  wordWrap: boolean;
  headerActions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function SingleEditorPane({
  id,
  tab,
  onTabChange,
  code,
  onCodeChange,
  onFormat,
  theme,
  wordWrap,
  headerActions,
  className = '',
  style,
}: SingleEditorPaneProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onCodeChange);
  onChangeRef.current = onCodeChange;
  const onFormatRef = useRef(onFormat);
  onFormatRef.current = onFormat;

  // Create / recreate editor on tab or theme change
  useEffect(() => {
    if (!editorRef.current) return;

    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const currentTab = tab;
    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      history(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      abbreviationTracker(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      langExtensions[currentTab](),
      lintGutter(),
      linter(createLinter(currentTab), { delay: 300 }),
      keymap.of([
        {
          key: 'Tab',
          run: expandAbbreviation,
        },
        ...completionKeymap,
        {
          key: 'Shift-Alt-f',
          run: () => {
            if (onFormatRef.current) {
              onFormatRef.current();
              return true;
            }
            return false;
          },
        },
        ...defaultKeymap,
        ...historyKeymap,
        ...closeBracketsKeymap,
      ]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current(currentTab, update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
      }),
    ];

    if (theme === 'dark') {
      extensions.push(oneDark);
    }
    
    if (wordWrap) {
      extensions.push(EditorView.lineWrapping);
    }

    const state = EditorState.create({
      doc: code[currentTab],
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [tab, theme, wordWrap]);

  // Update doc when code prop changes (solution / reset / step / format)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    const incoming = code[tab];
    if (current !== incoming) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: incoming },
      });
    }
  }, [code, tab]);

  return (
    <div className={`editor-pane ${className}`} style={style}>
      <div className="editor-header">
        <div className="editor-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`editor-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => onTabChange(t.key)}
              id={`${id}-tab-${t.key}`}
            >
              <span className={`editor-tab-dot ${t.key}`} />
              {t.label}
            </button>
          ))}
        </div>
        {headerActions && <div className="editor-actions">{headerActions}</div>}
      </div>
      <div className="editor-body" ref={editorRef} />
    </div>
  );
}

interface CodeEditorProps {
  code: CodeFiles;
  onCodeChange: (lang: keyof CodeFiles, value: string) => void;
  activeTab?: TabKey;
  theme: 'dark' | 'light';
  onReset?: () => void;
}

export function CodeEditor({
  code,
  onCodeChange,
  activeTab,
  theme,
  onReset,
}: CodeEditorProps) {
  const [isSplit, setIsSplit] = useState<boolean>(() => {
    return localStorage.getItem('foma-editor-split') === 'true';
  });
  const [wordWrap, setWordWrap] = useState<boolean>(() => {
    return localStorage.getItem('foma-editor-wrap') === 'true';
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('foma-editor-font-size');
    return saved ? Number(saved) : 13;
  });
  const [topTab, setTopTab] = useState<TabKey>(activeTab || 'html');
  const [bottomTab, setBottomTab] = useState<TabKey>('css');
  const [splitRatio, setSplitRatio] = useState<number>(0.5);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Ctrl + Wheel to zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1 : -1;
        setFontSize((prev) => {
          const next = Math.max(10, Math.min(30, prev + delta));
          localStorage.setItem('foma-editor-font-size', String(next));
          return next;
        });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Switch tab when activeTab prop changes (e.g. new step)
  useEffect(() => {
    if (activeTab) {
      setTopTab(activeTab);
      if (activeTab === 'html') {
        setBottomTab('css');
      } else if (activeTab === 'css') {
        setBottomTab('html');
      }
    }
  }, [activeTab]);

  const toggleSplit = () => {
    setIsSplit((prev) => {
      const next = !prev;
      localStorage.setItem('foma-editor-split', String(next));
      if (next && bottomTab === topTab) {
        setBottomTab(topTab === 'html' ? 'css' : 'html');
      }
      return next;
    });
  };

  const closeSplit = () => {
    setIsSplit(false);
    localStorage.setItem('foma-editor-split', 'false');
  };

  const toggleWordWrap = () => {
    setWordWrap((prev) => {
      const next = !prev;
      localStorage.setItem('foma-editor-wrap', String(next));
      return next;
    });
  };

  const handleFormatTop = () => {
    const formatted = formatCode(topTab, code[topTab]);
    onCodeChange(topTab, formatted);
  };

  const handleFormatBottom = () => {
    const formatted = formatCode(bottomTab, code[bottomTab]);
    onCodeChange(bottomTab, formatted);
  };

  const handleSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = ev.clientY - rect.top;
      const ratio = relativeY / rect.height;
      const clamped = Math.max(0.2, Math.min(0.8, ratio));
      setSplitRatio(clamped);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const topHeaderActions = (
    <>
      <button
        className={`btn-editor-action btn-editor-icon-only ${wordWrap ? 'active' : ''}`}
        onClick={toggleWordWrap}
        title={wordWrap ? 'Отключить перенос строк' : 'Включить перенос длинных строк (Word Wrap)'}
        aria-label={wordWrap ? 'Отключить перенос строк' : 'Включить перенос длинных строк'}
        id="toggle-wrap-btn"
      >
        <WrapText size={13} />
      </button>

      <button
        className={`btn-editor-action btn-editor-icon-only ${isSplit ? 'active' : ''}`}
        onClick={toggleSplit}
        title={isSplit ? 'Объединить в одну панель' : 'Разделить редактор по горизонтали (сверху и снизу)'}
        aria-label={isSplit ? 'Объединить в одну панель' : 'Разделить редактор по горизонтали'}
        id="toggle-split-btn"
      >
        {isSplit ? <Square size={13} /> : <Rows size={13} />}
      </button>

      <button
        className="btn btn-xs btn-ghost"
        onClick={handleFormatTop}
        title="Автоформатировать код активной вкладки (Shift+Alt+F)"
        id="editor-format-top-btn"
      >
        <Wand2 size={12} />
        <span>Формат</span>
      </button>

      {onReset && (
        <button
          className="btn btn-xs btn-ghost"
          onClick={onReset}
          title="Сбросить код к началу шага"
          id="editor-reset-btn"
        >
          <RotateCcw size={12} />
          <span>Сбросить</span>
        </button>
      )}
    </>
  );

  const bottomHeaderActions = (
    <>
      <button
        className="btn btn-xs btn-ghost"
        onClick={handleFormatBottom}
        title="Автоформатировать код активной вкладки (Shift+Alt+F)"
        id="editor-format-bottom-btn"
      >
        <Wand2 size={12} />
        <span>Формат</span>
      </button>

      <button
        className="btn btn-xs btn-ghost btn-close-split"
        onClick={closeSplit}
        title="Закрыть нижнюю панель"
        id="close-split-btn"
      >
        <X size={12} />
        <span>Закрыть</span>
      </button>
    </>
  );

  return (
    <div
      className="code-editor-wrapper"
      ref={containerRef}
      style={{ '--editor-font-size': `${fontSize}px` } as React.CSSProperties}
    >
      <SingleEditorPane
        id="top-editor"
        tab={topTab}
        onTabChange={setTopTab}
        code={code}
        onCodeChange={onCodeChange}
        onFormat={handleFormatTop}
        theme={theme}
        wordWrap={wordWrap}
        headerActions={topHeaderActions}
        className="top-pane"
        style={isSplit ? { height: `${splitRatio * 100}%` } : { flex: 1 }}
      />

      {isSplit && (
        <>
          <div
            className={`editor-splitter ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleSplitterMouseDown}
            onDoubleClick={() => setSplitRatio(0.5)}
            title="Потяните для изменения пропорций (двойной клик — 50/50)"
          />
          <SingleEditorPane
            id="bottom-editor"
            tab={bottomTab}
            onTabChange={setBottomTab}
            code={code}
            onCodeChange={onCodeChange}
            onFormat={handleFormatBottom}
            theme={theme}
            wordWrap={wordWrap}
            headerActions={bottomHeaderActions}
            className="bottom-pane"
            style={{ flex: 1 }}
          />
        </>
      )}
    </div>
  );
}
