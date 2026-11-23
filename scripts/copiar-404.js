// GitHub Pages responde con 404.html cuando una URL no corresponde a un archivo,
// por ejemplo al recargar /destinos/cusco. Si 404.html es una copia de index.html,
// la app carga igual y React Router muestra la página que corresponde.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('dist/404.html creado')