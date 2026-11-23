import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// base must match the repository name so the site works at /CourseCoach/
export default defineConfig({
  base: '/CourseCoach/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the planner (index.html) and the help page (help.html)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        help: fileURLToPath(new URL('./help.html', import.meta.url)),
      },
    },
  },
});
