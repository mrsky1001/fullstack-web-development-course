import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { LessonPanel } from './components/LessonPanel/LessonPanel';
import { CodeEditor } from './components/CodeEditor/CodeEditor';
import { Preview } from './components/Preview/Preview';
import { useLesson } from './hooks/useLesson';
import { useTheme } from './hooks/useTheme';
import './styles/tokens.css';
import './styles/global.css';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Column width state with localStorage persistence
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem('foma-sidebar-width');
    return saved ? Math.max(180, Math.min(480, Number(saved))) : 260;
  });

  const [lessonWidth, setLessonWidth] = useState<number>(() => {
    const saved = localStorage.getItem('foma-lesson-width');
    return saved ? Math.max(260, Math.min(800, Number(saved))) : 380;
  });

  const [editorRatio, setEditorRatio] = useState<number>(() => {
    const saved = localStorage.getItem('foma-editor-ratio');
    return saved ? Math.max(0.15, Math.min(0.85, Number(saved))) : 0.5;
  });

  // Active dragging column
  const [activeResizer, setActiveResizer] = useState<'sidebar' | 'lesson' | 'editor' | null>(null);
  const activeResizerRef = useRef<'sidebar' | 'lesson' | 'editor' | null>(null);
  activeResizerRef.current = activeResizer;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({
    startX: 0,
    startSidebarWidth: 260,
    startLessonWidth: 380,
    workspaceLeft: 0,
    workspaceWidth: 800,
  });

  const handleSidebarResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveResizer('sidebar');
    dragStartRef.current.startX = e.clientX;
    dragStartRef.current.startSidebarWidth = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleLessonResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveResizer('lesson');
    dragStartRef.current.startX = e.clientX;
    dragStartRef.current.startLessonWidth = lessonWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleEditorResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveResizer('editor');
    if (workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect();
      dragStartRef.current.workspaceLeft = rect.left;
      dragStartRef.current.workspaceWidth = rect.width;
    }
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const resizer = activeResizerRef.current;
      if (!resizer) return;

      if (resizer === 'sidebar') {
        const delta = e.clientX - dragStartRef.current.startX;
        const newWidth = Math.max(180, Math.min(480, dragStartRef.current.startSidebarWidth + delta));
        setSidebarWidth(newWidth);
      } else if (resizer === 'lesson') {
        const delta = e.clientX - dragStartRef.current.startX;
        const newWidth = Math.max(260, Math.min(800, dragStartRef.current.startLessonWidth + delta));
        setLessonWidth(newWidth);
      } else if (resizer === 'editor') {
        const { workspaceLeft, workspaceWidth } = dragStartRef.current;
        if (workspaceWidth > 0) {
          const ratio = (e.clientX - workspaceLeft) / workspaceWidth;
          const clamped = Math.max(0.15, Math.min(0.85, ratio));
          setEditorRatio(clamped);
        }
      }
    };

    const handleMouseUp = () => {
      if (activeResizerRef.current) {
        setActiveResizer(null);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('foma-sidebar-width', String(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    localStorage.setItem('foma-lesson-width', String(lessonWidth));
  }, [lessonWidth]);

  useEffect(() => {
    localStorage.setItem('foma-editor-ratio', String(editorRatio));
  }, [editorRatio]);

  // Prevent default save (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const {
    lesson,
    step,
    lessons: allLessons,
    stepIndex,
    totalSteps,
    code,
    goToStep,
    nextStep,
    prevStep,
    goToLesson,
    nextLesson,
    prevLesson,
    resetCode,
    toggleSolution,
    isShowingSolution,
    updateCode,
    hasNextStep,
    hasPrevStep,
    hasNextLesson,
    hasPrevLesson,
  } = useLesson();

  return (
    <div className={`app ${theme}`} id="app-root">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
      />
      <div className={`app-body ${activeResizer ? 'is-resizing' : ''}`}>
        <Sidebar
          lessons={allLessons}
          currentIndex={lesson.id}
          collapsed={sidebarCollapsed}
          onSelectLesson={goToLesson}
          width={sidebarWidth}
          isResizing={activeResizer === 'sidebar'}
        />

        {!sidebarCollapsed && (
          <div
            className={`col-resizer ${activeResizer === 'sidebar' ? 'active' : ''}`}
            onMouseDown={handleSidebarResizeStart}
            onDoubleClick={() => setSidebarWidth(260)}
            title="Потяните для изменения ширины списка уроков (двойной клик — сброс)"
            id="resizer-sidebar"
          />
        )}

        <div
          className={`panel-container ${activeResizer === 'lesson' ? 'resizing' : ''}`}
          style={{ width: `${lessonWidth}px` }}
          id="lesson-panel-container"
        >
          <LessonPanel
            lesson={lesson}
            step={step}
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            hasPrevStep={hasPrevStep}
            hasNextStep={hasNextStep}
            hasPrevLesson={hasPrevLesson}
            hasNextLesson={hasNextLesson}
            isShowingSolution={isShowingSolution}
            onToggleSolution={toggleSolution}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            onPrevLesson={prevLesson}
            onNextLesson={nextLesson}
            onGoToStep={goToStep}
          />
        </div>

        <div
          className={`col-resizer ${activeResizer === 'lesson' ? 'active' : ''}`}
          onMouseDown={handleLessonResizeStart}
          onDoubleClick={() => setLessonWidth(380)}
          title="Потяните для изменения ширины описания (двойной клик — сброс)"
          id="resizer-lesson"
        />

        <div className="workspace" ref={workspaceRef} id="workspace">
          <div
            className="workspace-editor"
            style={{ width: `${editorRatio * 100}%`, flex: 'none' }}
          >
            <CodeEditor
              code={code}
              onCodeChange={updateCode}
              activeTab={step.highlight}
              theme={theme}
              onReset={resetCode}
            />
          </div>

          <div
            className={`col-resizer ${activeResizer === 'editor' ? 'active' : ''}`}
            onMouseDown={handleEditorResizeStart}
            onDoubleClick={() => setEditorRatio(0.5)}
            title="Потяните для изменения соотношения редактора и превью (двойной клик — 50/50)"
            id="resizer-editor"
          />

          <div className="workspace-preview" style={{ flex: 1 }}>
            <Preview
              code={code}
              lessonNumber={lesson.id}
              stepNumber={stepIndex + 1}
              stepTitle={step.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
