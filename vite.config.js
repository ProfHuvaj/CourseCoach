import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// base must match the repository name so the site works at /CourseCoach/
export default defineConfig({
  base: '/CourseCoach/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the planner (index.html) and the student guide (guide.html)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        guide: fileURLToPath(new URL('./guide.html', import.meta.url)),
      },
    },
  },
});
