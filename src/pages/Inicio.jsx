import { Link } from 'react-router'

function Inicio() {
  return (
    <section className="max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">Planifica tu próximo viaje</h1>
      <p className="mb-6 text-texto-suave">
        Elige un destino, revisa sus actividades populares y compara vuelos y hoteles
        disponibles para armar tu viaje.
      </p>
      <Link
        to="/destinos"
        className="inline-block rounded bg-primario px-5 py-3 font-semibold text-white hover:opacity-90"
      >
        Explorar destinos
      </Link>
    </section>
  )
}

export default Inicio