import { Link } from 'react-router'

function NoEncontrado() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Página no encontrada</h1>
      <p className="mb-4">La dirección que buscas no existe.</p>
      <div className="flex flex-wrap gap-4">
        <Link to="/destinos" className="font-semibold text-primario underline">Ver destinos</Link>
        <Link to="/" className="font-semibold text-primario underline">Volver al inicio</Link>
      </div>
    </section>
  )
}

export default NoEncontrado