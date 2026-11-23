import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const BASE_PRODUCCION = '/viajes-diego-cruz-PFY2202/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PRODUCCION : '/',
  plugins: [react(), tailwindcss()],
}))