import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base must match the repository name so the site works at /CourseCoach/
export default defineConfig({
  base: '/CourseCoach/',
  plugins: [react()],
});
