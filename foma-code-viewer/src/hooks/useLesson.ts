import { useState, useCallback, useEffect } from 'react';
import type { CodeFiles } from '../types/lesson';
import { lessons } from '../lessons';
import { formatCode } from '../utils/formatCode';

function formatCodeFiles(files: CodeFiles): CodeFiles {
  return {
    html: formatCode('html', files.html),
    css: formatCode('css', files.css),
    js: formatCode('js', files.js),
  };
}

function getInitialLessonAndStep(): { lessonIdx: number; stepIdx: number } {
  let lessonParam: string | null = null;
  let stepParam: string | null = null;

  try {
    // 1. Check URL search params (?lesson=4&step=1 or ?l=4&s=1)
    const searchParams = new URLSearchParams(window.location.search);
    lessonParam = searchParams.get('lesson') || searchParams.get('l');
    stepParam = searchParams.get('step') || searchParams.get('s');

    // 2. Hash fallback (#lesson=4&step=1 or #/4/1)
    if (!lessonParam && window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#\/?/, '');
      const hashParams = new URLSearchParams(cleanHash);
      lessonParam = hashParams.get('lesson') || hashParams.get('l');
      stepParam = hashParams.get('step') || hashParams.get('s');

      if (!lessonParam) {
        const match = cleanHash.match(/(?:lesson\/)?(\d+)(?:\/step\/|\/)(\d+)/i);
        if (match) {
          lessonParam = match[1];
          stepParam = match[2];
        }
      }
    }

    // 3. LocalStorage fallback
    if (!lessonParam) {
      lessonParam = localStorage.getItem('foma-last-lesson-id');
      stepParam = localStorage.getItem('foma-last-step-idx');
    }
  } catch {
    // Ignore in non-browser context
  }

  let lessonIdx = 0;
  let stepIdx = 0;

  if (lessonParam) {
    const num = parseInt(lessonParam, 10);
    const foundIdx = lessons.findIndex((l) => l.id === num);
    if (foundIdx !== -1) {
      lessonIdx = foundIdx;
    }
  }

  if (stepParam) {
    const sNum = parseInt(stepParam, 10);
    if (!isNaN(sNum)) {
      const targetIdx = sNum >= 1 ? sNum - 1 : 0;
      if (targetIdx >= 0 && targetIdx < lessons[lessonIdx].steps.length) {
        stepIdx = targetIdx;
      }
    }
  }

  return { lessonIdx, stepIdx };
}

export function useLesson() {
  const initial = getInitialLessonAndStep();
  const [lessonIndex, setLessonIndex] = useState(initial.lessonIdx);
  const [stepIndex, setStepIndex] = useState(initial.stepIdx);
  const [code, setCode] = useState<CodeFiles>(() =>
    formatCodeFiles({ ...lessons[initial.lessonIdx].steps[initial.stepIdx].startCode })
  );
  
  const [isShowingSolution, setIsShowingSolution] = useState(false);
  const [userCodeBeforeSolution, setUserCodeBeforeSolution] = useState<CodeFiles | null>(null);

  const lesson = lessons[lessonIndex];
  const step = lesson.steps[stepIndex];
  const totalSteps = lesson.steps.length;

  // Sync URL and localStorage on lesson/step change
  useEffect(() => {
    const currentLesson = lessons[lessonIndex];
    if (!currentLesson) return;

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lesson', String(currentLesson.id));
      url.searchParams.set('step', String(stepIndex + 1));
      window.history.replaceState(null, '', url.toString());

      localStorage.setItem('foma-last-lesson-id', String(currentLesson.id));
      localStorage.setItem('foma-last-step-idx', String(stepIndex + 1));
    } catch {
      // Ignore
    }
  }, [lessonIndex, stepIndex]);

  // Sync state if user clicks browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { lessonIdx, stepIdx } = getInitialLessonAndStep();
      setLessonIndex(lessonIdx);
      setStepIndex(stepIdx);
      setCode(formatCodeFiles({ ...lessons[lessonIdx].steps[stepIdx].startCode }));
      setIsShowingSolution(false);
      setUserCodeBeforeSolution(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Helper to reset solution state on navigation
  const resetSolutionState = useCallback(() => {
    setIsShowingSolution(false);
    setUserCodeBeforeSolution(null);
  }, []);

  // ── Step navigation ──
  const goToStep = useCallback((idx: number) => {
    const l = lessons[lessonIndex];
    if (idx >= 0 && idx < l.steps.length) {
      setStepIndex(idx);
      setCode(formatCodeFiles({ ...l.steps[idx].startCode }));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState]);

  const nextStep = useCallback(() => {
    const l = lessons[lessonIndex];
    if (stepIndex < l.steps.length - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      setCode(formatCodeFiles({ ...l.steps[next].startCode }));
      resetSolutionState();
    }
  }, [lessonIndex, stepIndex, resetSolutionState]);

  const prevStep = useCallback(() => {
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      setStepIndex(prev);
      setCode(formatCodeFiles({ ...lessons[lessonIndex].steps[prev].startCode }));
      resetSolutionState();
    }
  }, [lessonIndex, stepIndex, resetSolutionState]);

  // ── Lesson navigation ──
  const goToLesson = useCallback((id: number) => {
    const idx = lessons.findIndex((l) => l.id === id);
    if (idx !== -1) {
      setLessonIndex(idx);
      setStepIndex(0);
      setCode(formatCodeFiles({ ...lessons[idx].steps[0].startCode }));
      resetSolutionState();
    }
  }, [resetSolutionState]);

  const nextLesson = useCallback(() => {
    if (lessonIndex < lessons.length - 1) {
      const next = lessonIndex + 1;
      setLessonIndex(next);
      setStepIndex(0);
      setCode(formatCodeFiles({ ...lessons[next].steps[0].startCode }));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState]);

  const prevLesson = useCallback(() => {
    if (lessonIndex > 0) {
      const prev = lessonIndex - 1;
      setLessonIndex(prev);
      setStepIndex(0);
      setCode(formatCodeFiles({ ...lessons[prev].steps[0].startCode }));
      resetSolutionState();
    }
  }, [lessonIndex, resetSolutionState]);

  // ── Code actions ──
  const resetCode = useCallback(() => {
    setCode(formatCodeFiles({ ...lessons[lessonIndex].steps[stepIndex].startCode }));
    resetSolutionState();
  }, [lessonIndex, stepIndex, resetSolutionState]);

  const toggleSolution = useCallback(() => {
    if (isShowingSolution) {
      // Hide solution, restore user code
      setCode(userCodeBeforeSolution || formatCodeFiles({ ...lessons[lessonIndex].steps[stepIndex].startCode }));
      setIsShowingSolution(false);
      setUserCodeBeforeSolution(null);
    } else {
      // Show solution, save current code
      setUserCodeBeforeSolution(code);
      setCode(formatCodeFiles({ ...lessons[lessonIndex].steps[stepIndex].solutionCode }));
      setIsShowingSolution(true);
    }
  }, [isShowingSolution, code, userCodeBeforeSolution, lessonIndex, stepIndex]);

  const updateCode = useCallback((lang: keyof CodeFiles, value: string) => {
    setCode((prev) => ({ ...prev, [lang]: value }));
  }, []);

  return {
    lesson,
    step,
    lessons,
    lessonIndex,
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
    hasNextStep: stepIndex < totalSteps - 1,
    hasPrevStep: stepIndex > 0,
    hasNextLesson: lessonIndex < lessons.length - 1,
    hasPrevLesson: lessonIndex > 0,
  } as const;
}
