# Rumbo Viajes — viajes-diego-cruz-PFY2202

Aplicación React para una agencia de viajes (actividad sumativa, semana 5 de Desarrollo Frontend II, Duoc UC).
Permite explorar destinos y, al elegir uno, comparar vuelos y hoteles para armar un viaje con su total estimado.

**Sitio publicado:** https://dcruz-00.github.io/viajes-diego-cruz-PFY2202/

- **API REST simulada:** lista los destinos con su país y actividades populares.
- **API GraphQL simulada:** entrega los vuelos y hoteles de cada destino con precios, fechas y disponibilidad.
- Ambas se simulan con Mock Service Worker (MSW), activo en desarrollo **y** en el sitio publicado.

## Tecnologías

React 19 · React Router 8 · Apollo Client 4 · graphql 17 · MSW 3 · Vite 8 · Tailwind CSS 4 · gh-pages

## Cómo ejecutar

Requiere Node 22 o superior.

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # compila en dist/ (incluye 404.html)
npm run preview    # sirve la compilación en local
npm run deploy     # compila y publica dist/ en la rama gh-pages
npm run lint
```

> `npm run preview` sirve el sitio en `http://localhost:4173/viajes-diego-cruz-PFY2202/` porque la compilación usa la ruta base del repositorio.

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/destinos` | Listado de destinos con búsqueda por ciudad, país o actividad (REST) |
| `/destinos/:id` | Detalle del destino (REST) con vuelos, hoteles y resumen del viaje (GraphQL) |
| `*` | Página no encontrada |

## API simulada

### REST

| Método y ruta | Respuesta |
|---|---|
| `GET /api/destinos` | `[{ id, nombre, pais, actividades }]` |
| `GET /api/destinos/:id` | `{ id, nombre, pais, descripcion, idioma, moneda, actividades }` o 404 `{ mensaje }` |
| Cualquier otra ruta `/api/*` | 404 `{ mensaje }` |

### GraphQL (`POST /graphql`)

El mock ejecuta las consultas contra un esquema real (`src/mocks/esquema.js`), así que responde solo los campos pedidos y valida tipos y argumentos.

```graphql
type Query {
  vuelos(destinoId: ID!): [Vuelo!]!
  hoteles(destinoId: ID!): [Hotel!]!
}
```

La app usa una sola consulta, `OpcionesViaje`, que trae vuelos y hoteles en una petición (`src/graphql/consultas.js`).
Un `destinoId` inexistente responde un error con `extensions.code = "NOT_FOUND"`.

## Estructura

```
src/
  api/          cliente HTTP, validación de respuestas y almacén de consultas REST
  graphql/      cliente Apollo, consulta, traducción de errores y validación
  hooks/        useConsulta (conecta componentes con el almacén REST)
  components/   componentes reutilizables (tarjetas, listas, estados, resumen, panel de fallas)
  pages/        una página por ruta
  layouts/      estructura común (encabezado, navegación, pie)
  routes/       definición de rutas
  mocks/        datos, handlers REST y GraphQL, esquema y simulación de fallas
  utils/        formato de precios, fechas, plurales y reglas del viaje
```

## Manejo de datos y errores

- **Deduplicación:** dos componentes que piden la misma clave comparten una sola petición (REST: almacén propio; GraphQL: Apollo).
- **Caché:** REST guarda hasta 20 consultas con vigencia de 5 minutos; GraphQL usa `cache-and-network` (muestra la caché y la actualiza al volver).
- **Reintentos automáticos:** hasta 3 intentos con espera progresiva (500 ms y 1 s), solo en fallos que pueden resolverse así (sin conexión y errores 5xx).
- **Validación:** además de que el JSON sea válido, se revisa que traiga los campos que la interfaz necesita.
- **Mensajes:** un título distinto por tipo de fallo, botón Reintentar dentro de la misma sección y un enlace alternativo.
- **Carga:** esqueletos con la forma del contenido, `aria-busy` en la región y aviso de los reintentos en curso.

## Casos de prueba

Las fallas se activan en el panel **«Simular fallas de la API»** del pie de página. Al recargar, todo vuelve a «Normal».

| # | Caso | Cómo reproducirlo | Resultado esperado |
|---|---|---|---|
| 1 | Listado de destinos | Ir a Destinos | 7 destinos con país y actividades |
| 2 | Búsqueda | Escribir «peru» o «museo» | Filtra sin importar tildes ni mayúsculas; sin resultados ofrece limpiar |
| 3 | Vuelos y hoteles | Abrir Cusco | Una sola petición GraphQL; vuelos y hoteles con precio, fechas y disponibilidad |
| 4 | Armar un viaje | Cusco → elegir AA 412 y Casa del Inca | Total $935.990 (vuelo + 7 noches) |
| 5 | Hotel fuera de fechas | Cusco → elegir CV 208 | Hostal San Blas queda «No disponible en las fechas de tu vuelo» |
| 6 | Vuelos agotados | Abrir Tokio | Aviso de vuelos agotados, botones deshabilitados |
| 7 | Sin hoteles | Abrir San Pedro de Atacama | Estado vacío en Hoteles |
| 8 | Destino inexistente | Ir a `/destinos/narnia` | «No encontramos lo que buscas», sin Reintentar, con enlace a destinos |
| 9 | Ruta inexistente | Ir a `/xyz` | Página no encontrada |
| 10 | Falla transitoria | REST → «Falla transitoria» y abrir un destino no visitado | Muestra «Reintentando… (intento 2 de 3)» y se recupera sola (en GraphQL también se recupera, sin aviso de intentos) |
| 11 | Error del servidor | REST o GraphQL → «Error del servidor» | Tras 3 intentos: «Error del servidor» con Reintentar |
| 12 | Sin conexión | REST o GraphQL → «Sin conexión» | «Sin conexión» con Reintentar |
| 13 | Respuesta ilegible | REST o GraphQL → «Respuesta ilegible» | «Respuesta ilegible», sin reintentos automáticos |
| 14 | Respuesta incompleta | REST → «Respuesta incompleta» | «Datos incompletos» en vez de una pantalla rota |
| 15 | Recuperación | Con un error en pantalla, volver a «Normal» | Los datos se vuelven a consultar y aparecen |
| 16 | Respuesta lenta | «Respuesta lenta» y abrir un destino no visitado | Esqueletos durante 4 s, sin saltos al llegar los datos |
| 17 | Enlace profundo | Abrir y recargar `/destinos/madrid` en el sitio publicado | Carga el detalle (gracias a `404.html`) |

> Caso 14 en GraphQL: si el destino ya estaba en la caché de Apollo, se siguen mostrando los hoteles conocidos. Para ver el error, activar el modo y entrar a un destino que no se haya abierto antes.

## Pruebas en navegadores

Probado en el sitio publicado (GitHub Pages) y en `npm run dev`.

| Navegador | Versión | Escritorio | Móvil / vista responsiva | Observaciones |
|---|---|---|---|---|
| Chromium | — | — | — | — |
| Firefox | — | — | — | — |

Casos revisados en cada navegador: 1 a 17 de la tabla anterior, más la vista en anchos de 390 px, 768 px y 1280 px.

**Hallazgo:** en una ventana privada de Firefox no se pueden registrar *service workers*, así que MSW no inicia. En ese caso la app muestra un mensaje explicando el problema en vez de quedar en blanco.

## Limitaciones

- Los datos son simulados y se pierden al recargar (no hay persistencia).
- El total del viaje es para 1 pasajero.
- Con GitHub Pages, un enlace profundo responde con estado HTTP 404 aunque la página se vea bien (lo entrega `404.html`).