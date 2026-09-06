import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lesson, LessonStep } from '../../types/lesson';
import './LessonPanel.css';

interface LessonPanelProps {
  lesson: Lesson;
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  hasPrevLesson: boolean;
  hasNextLesson: boolean;
  isShowingSolution: boolean;
  onToggleSolution: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onPrevLesson: () => void;
  onNextLesson: () => void;
  onGoToStep: (idx: number) => void;
}

export function LessonPanel({
  step,
  stepIndex,
  totalSteps,
  hasPrevStep,
  hasNextStep,
  hasPrevLesson,
  hasNextLesson,
  isShowingSolution,
  onToggleSolution,
  onPrevStep,
  onNextStep,
  onPrevLesson,
  onNextLesson,
  onGoToStep,
}: LessonPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll to top when switching steps
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [stepIndex]);

  const hasSolution =
    step.startCode.html !== step.solutionCode.html ||
    step.startCode.css !== step.solutionCode.css ||
    step.startCode.js !== step.solutionCode.js;

  return (
    <>
      <div className="panel-header">
        <div className="panel-header-info">
          <span className="step-badge">Шаг {stepIndex + 1}/{totalSteps}</span>
          <span className="panel-header-title" title={step.title}>
            {step.title}
          </span>
        </div>
        <div className="step-indicator">
          {Array.from({ length: totalSteps }, (_, i) => (
            <button
              key={i}
              className={`step-dot ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'completed' : ''}`}
              onClick={() => onGoToStep(i)}
              title={`Шаг ${i + 1}`}
              id={`step-dot-${i}`}
              aria-label={`Перейти к шагу ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="lesson-panel" ref={panelRef}>
        <div className="md-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ ...props }) => (
                <div className="table-container">
                  <table {...props} />
                </div>
              ),
            }}
          >
            {step.explanation}
          </ReactMarkdown>
        </div>
        {hasSolution && (
          <div className="lesson-solution-section">
            <button
              className="btn btn-sm btn-solution"
              onClick={onToggleSolution}
              id="show-solution-btn"
              title={isShowingSolution ? "Вернуться к вашему коду" : "Показать правильное решение этого шага"}
            >
              {isShowingSolution ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{isShowingSolution ? "Скрыть решение" : "Показать решение"}</span>
            </button>
          </div>
        )}
      </div>
      <div className="lesson-panel-footer">
        <div className="lesson-panel-footer-left">
          {hasPrevStep ? (
            <button className="btn btn-sm" onClick={onPrevStep} id="prev-step-btn" title="Предыдущий шаг">
              <ChevronLeft size={14} />
              Назад
            </button>
          ) : hasPrevLesson ? (
            <button className="btn btn-sm" onClick={onPrevLesson} id="prev-lesson-btn" title="Предыдущий вебинар">
              <ChevronLeft size={14} />
              Пред. вебинар
            </button>
          ) : null}
        </div>
        <div className="lesson-panel-footer-right">
          {hasNextStep ? (
            <button className="btn btn-sm btn-accent" onClick={onNextStep} id="next-step-btn" title="Следующий шаг">
              Далее
              <ChevronRight size={14} />
            </button>
          ) : hasNextLesson ? (
            <button className="btn btn-sm btn-accent" onClick={onNextLesson} id="next-lesson-btn" title="Следующий вебинар">
              След. вебинар
              <ChevronRight size={14} />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
