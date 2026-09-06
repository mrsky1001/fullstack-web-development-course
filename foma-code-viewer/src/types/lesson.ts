export type CodeFiles = {
  html: string;
  css: string;
  js: string;
};

export type LessonStep = {
  title: string;
  explanation: string;
  startCode: CodeFiles;
  solutionCode: CodeFiles;
  highlight?: 'html' | 'css' | 'js';
};

export type Lesson = {
  id: number;
  title: string;
  discipline?: string;
  steps: LessonStep[];
};
