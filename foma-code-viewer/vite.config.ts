import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fomaLessonsPlugin } from './plugins/vite-plugin-lessons';

export default defineConfig({
  plugins: [
    fomaLessonsPlugin(),
    react(),
  ],
});
