import { useState, useCallback } from 'react';
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

export function useLesson() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [code, setCode] = useState<CodeFiles>(() => formatCodeFiles({ ...lessons[0].steps[0].startCode }));
  
  const [isShowingSolution, setIsShowingSolution] = useState(false);
  const [userCodeBeforeSolution, setUserCodeBeforeSolution] = useState<CodeFiles | null>(null);

  const lesson = lessons[lessonIndex];
  const step = lesson.steps[stepIndex];
  const totalSteps = lesson.steps.length;

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
