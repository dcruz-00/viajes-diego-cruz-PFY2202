import { Link } from 'react-router'

const TITULOS = {
  red: 'Sin conexión',
  servidor: 'Error del servidor',
  'no-encontrado': 'No encontramos lo que buscas',
  solicitud: 'Solicitud rechazada',
  'respuesta-invalida': 'Respuesta ilegible',
  'respuesta-incompleta': 'Datos incompletos',
  consulta: 'Consulta rechazada',
}

/**
 * Error de la API con salidas para el usuario.
 * - onReintentar: vuelve a consultar sin salir de la sección (no se ofrece en un 404).
 * - intentos: cuántas veces se intentó automáticamente antes de rendirse.
 * - alternativa: { to, texto } enlace a otra sección.
 */
function MensajeError({ error, onReintentar, intentos = 1, alternativa }) {
  const titulo = TITULOS[error.tipo] ?? 'Error inesperado'
  const puedeReintentar = onReintentar && error.tipo !== 'no-encontrado'

  return (
    <div role="alert" className="my-4 rounded-lg border border-error/40 bg-error/5 p-4">
      <p className="font-semibold text-error">{titulo}</p>
      <p className="mt-1">{error.message}</p>
      {intentos > 1 && (
        <p className="mt-1 text-sm text-texto-suave">Se intentó {intentos} veces sin éxito.</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {puedeReintentar && (
          <button
            type="button"
            onClick={onReintentar}
            className="rounded bg-primario px-4 py-2 font-semibold text-white hover:opacity-90"
          >
            Reintentar
          </button>
        )}
        {alternativa && (
          <Link to={alternativa.to} className="font-semibold text-primario underline">
            {alternativa.texto}
          </Link>
        )}
      </div>
    </div>
  )
}

export default MensajeError