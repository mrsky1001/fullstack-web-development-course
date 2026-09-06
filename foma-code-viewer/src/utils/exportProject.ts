import JSZip from 'jszip';
import type { CodeFiles } from '../types/lesson';

export function generateZipFilename(lessonNumber: number, stepNumber: number, stepTitle: string): string {
  const padLesson = String(lessonNumber).padStart(2, '0');
  const padStep = String(stepNumber).padStart(2, '0');
  const cleanTitle = (stepTitle || 'проект')
    .toLowerCase()
    .replace(/[/\\?%*:|"<>#]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return `${padLesson}-${padStep}-${cleanTitle}.zip`;
}

export function getCompleteHtml(code: CodeFiles, title = 'СмартОфис — Проект'): string {
  const rawHtml = code.html || '';
  const hasDocType = rawHtml.includes('<!DOCTYPE') || rawHtml.includes('<html');

  if (hasDocType) {
    let html = rawHtml;
    // Inject link to style.css if needed
    if (!html.includes('style.css') && code.css && code.css.trim()) {
      if (html.includes('</head>')) {
        html = html.replace('</head>', '  <link rel="stylesheet" href="style.css">\n</head>');
      } else {
        html = `<link rel="stylesheet" href="style.css">\n` + html;
      }
    }
    // Inject script src="main.js" if needed
    if (!html.includes('main.js') && code.js && code.js.trim()) {
      if (html.includes('</body>')) {
        html = html.replace('</body>', '  <script src="main.js"></script>\n</body>');
      } else {
        html = html + `\n<script src="main.js"></script>`;
      }
    }
    return html;
  }

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
${rawHtml}
  <script src="main.js"></script>
</body>
</html>`;
}

export async function downloadProjectZip(
  code: CodeFiles,
  lessonNumber = 1,
  stepNumber = 1,
  stepTitle = 'код',
  pageTitle?: string
): Promise<string> {
  const filename = generateZipFilename(lessonNumber, stepNumber, stepTitle);
  const zip = new JSZip();
  const fullHtml = getCompleteHtml(
    code,
    pageTitle || `Вебинар ${lessonNumber} · Шаг ${stepNumber} — ${stepTitle}`
  );

  zip.file('index.html', fullHtml);
  zip.file('style.css', code.css || '/* Стили проекта */\n');
  zip.file('main.js', code.js || '// Скрипты проекта\n');

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return filename;
}

export async function saveProjectToFolder(
  code: CodeFiles,
  pageTitle = 'СмартОфис — Проект'
): Promise<{ success: boolean; message?: string }> {
  if (!('showDirectoryPicker' in window)) {
    return {
      success: false,
      message: 'Браузер не поддерживает прямое сохранение в папку. Скачайте ZIP-архив.',
    };
  }

  try {
    // Request directory from user
    // @ts-expect-error - File System Access API
    const dirHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
    });

    const fullHtml = getCompleteHtml(code, pageTitle);

    // Write index.html
    const htmlFileHandle = await dirHandle.getFileHandle('index.html', { create: true });
    const htmlWritable = await htmlFileHandle.createWritable();
    await htmlWritable.write(fullHtml);
    await htmlWritable.close();

    // Write style.css
    const cssFileHandle = await dirHandle.getFileHandle('style.css', { create: true });
    const cssWritable = await cssFileHandle.createWritable();
    await cssWritable.write(code.css || '/* Стили проекта */\n');
    await cssWritable.close();

    // Write main.js
    const jsFileHandle = await dirHandle.getFileHandle('main.js', { create: true });
    const jsWritable = await jsFileHandle.createWritable();
    await jsWritable.write(code.js || '// Скрипты проекта\n');
    await jsWritable.close();

    return { success: true };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { success: false };
    }
    console.error('Failed to save files to directory:', err);
    return {
      success: false,
      message: err.message || 'Не удалось сохранить файлы в выбранную папку',
    };
  }
}
