import { useMemo, useState } from 'react';
import { Download, FolderDown, Check } from 'lucide-react';
import type { CodeFiles } from '../../types/lesson';
import { downloadProjectZip, saveProjectToFolder, generateZipFilename } from '../../utils/exportProject';
import './Preview.css';

interface PreviewProps {
  code: CodeFiles;
  lessonNumber?: number;
  stepNumber?: number;
  stepTitle?: string;
}

export function Preview({
  code,
  lessonNumber = 1,
  stepNumber = 1,
  stepTitle = 'код',
}: PreviewProps) {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const hasFolderApi = typeof window !== 'undefined' && 'showDirectoryPicker' in window;
  const targetZipName = useMemo(
    () => generateZipFilename(lessonNumber, stepNumber, stepTitle),
    [lessonNumber, stepNumber, stepTitle]
  );

  const srcdoc = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${code.css}</style>
</head>
<body>
${code.html}
<script>${code.js}<\/script>
</body>
</html>`;
  }, [code.html, code.css, code.js]);

  const handleSaveToFolder = async () => {
    const res = await saveProjectToFolder(code);
    if (res.success) {
      setStatusMsg('Сохранено в папку!');
      setTimeout(() => setStatusMsg(null), 3500);
    } else if (res.message) {
      alert(res.message);
    }
  };

  const handleDownloadZip = async () => {
    const filename = await downloadProjectZip(
      code,
      lessonNumber,
      stepNumber,
      stepTitle
    );
    setStatusMsg(`ZIP скачан (${filename})`);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  return (
    <div className="preview-wrapper">
      <div className="preview-header">
        <div className="preview-header-left">
          <span className="preview-header-title">Результат</span>
          {statusMsg && (
            <span className="preview-status-badge">
              <Check size={12} />
              {statusMsg}
            </span>
          )}
        </div>
        <div className="preview-header-actions">
          {hasFolderApi && (
            <button
              className="btn btn-xs btn-ghost"
              onClick={handleSaveToFolder}
              title="Сохранить файлы проекта (index.html, style.css, main.js) прямо в папку на диске"
              id="save-to-folder-btn"
            >
              <FolderDown size={12} />
              <span>В папку...</span>
            </button>
          )}
          <button
            className="btn btn-xs btn-accent"
            onClick={handleDownloadZip}
            title={`Скачать ZIP-архив: ${targetZipName}`}
            id="download-zip-btn"
          >
            <Download size={12} />
            <span>Скачать сайт (ZIP)</span>
          </button>
        </div>
      </div>
      <div className="preview-body">
        <iframe
          srcDoc={srcdoc}
          title="Preview"
          sandbox="allow-scripts allow-modals"
          id="preview-iframe"
        />
      </div>
    </div>
  );
}
