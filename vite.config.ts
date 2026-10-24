import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy 3D libs into their own chunk so first paint stays fast
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
