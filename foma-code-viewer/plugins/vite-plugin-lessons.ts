import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// ─── Types (mirrors src/types/lesson.ts) ─────────────────────────────────────
interface CodeFiles { html: string; css: string; js: string; }
interface LessonStep {
  title: string;
  explanation: string;
  startCode: CodeFiles;
  solutionCode: CodeFiles;
  highlight?: 'html' | 'css' | 'js';
}
interface Lesson { id: number; title: string; discipline?: string; steps: LessonStep[]; }

// ─── Parse a single .md step file ────────────────────────────────────────────
function parseMdStep(content: string, filePath: string): LessonStep {
  // Split front-matter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) throw new Error(`No YAML front-matter in ${filePath}`);

  const meta = yaml.load(fmMatch[1]) as Record<string, unknown>;
  const body = fmMatch[2];

  // Split explanation from code blocks
  // Everything before the first ```lang:start or ```lang:solution is explanation
  const firstBlockIdx = body.search(/^```\w+:(start|solution)/m);
  const explanation = (firstBlockIdx === -1 ? body : body.slice(0, firstBlockIdx)).trim();

  // Extract fenced code blocks: ```lang:start or ```lang:solution
  const codeBlocks: Record<string, string> = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let match;
  while ((match = blockRe.exec(body)) !== null) {
    const [, lang, variant, code] = match;
    codeBlocks[`${lang}:${variant}`] = code.trimEnd();
  }

  const emptyCode: CodeFiles = { html: '', css: '', js: '' };

  function extractCode(variant: 'start' | 'solution'): CodeFiles {
    return {
      html: codeBlocks[`html:${variant}`] ?? '',
      css:  codeBlocks[`css:${variant}`]  ?? '',
      js:   codeBlocks[`js:${variant}`]   ?? '',
    };
  }

  return {
    title: String(meta.title ?? ''),
    explanation,
    startCode:    extractCode('start'),
    solutionCode: extractCode('solution'),
    highlight: meta.highlight as LessonStep['highlight'] | undefined,
  };
}

// ─── Load all lessons from content/lessons directory ─────────────────────────
function loadAllLessons(contentDir: string): Lesson[] {
  if (!fs.existsSync(contentDir)) return [];

    const lessonDirs = fs.readdirSync(contentDir, { withFileTypes: true })
      .filter((d: fs.Dirent) => d.isDirectory())
      .sort((a: fs.Dirent, b: fs.Dirent) => a.name.localeCompare(b.name));

    const lessons: Lesson[] = [];

    for (const dir of lessonDirs) {
      const lessonPath = path.join(contentDir, dir.name);

      // Read lesson meta from _lesson.yml
      const metaPath = path.join(lessonPath, '_lesson.yml');
      if (!fs.existsSync(metaPath)) continue;
      const meta = yaml.load(fs.readFileSync(metaPath, 'utf-8')) as Record<string, unknown>;

      // Read step files sorted by name
      const stepFiles = fs.readdirSync(lessonPath)
        .filter((f: string) => f.endsWith('.md'))
        .sort();

    const steps: LessonStep[] = [];
    for (const stepFile of stepFiles) {
      const stepPath = path.join(lessonPath, stepFile);
      try {
        const step = parseMdStep(fs.readFileSync(stepPath, 'utf-8'), stepPath);
        steps.push(step);
      } catch (e) {
        console.error(`[foma-lessons] Error parsing ${stepPath}:`, e);
      }
    }

    lessons.push({
      id: Number(meta.id),
      title: String(meta.title ?? dir.name),
      discipline: meta.discipline ? String(meta.discipline) : undefined,
      steps,
    });
  }

  return lessons.sort((a, b) => a.id - b.id);
}

// ─── Vite Plugin ─────────────────────────────────────────────────────────────
const VIRTUAL_ID = 'virtual:lessons';
const RESOLVED_ID = '\0virtual:lessons';

export function fomaLessonsPlugin(): Plugin {
  let contentDir: string;

  return {
    name: 'foma-lessons',

    configResolved(config) {
      contentDir = path.resolve(config.root, 'content', 'lessons');
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id !== RESOLVED_ID) return;
      const lessons = loadAllLessons(contentDir);
      return `export const lessons = ${JSON.stringify(lessons, null, 2)};`;
    },

    configureServer(server) {
      // Watch content directory for changes
      if (fs.existsSync(contentDir)) {
        server.watcher.add(path.join(contentDir, '**/*.md'));
        server.watcher.add(path.join(contentDir, '**/*.yml'));
        server.watcher.on('change', (file) => {
          if (file.startsWith(contentDir)) {
            // Invalidate virtual module → triggers HMR
            const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
            if (mod) server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        });
      }
    },
  };
}
