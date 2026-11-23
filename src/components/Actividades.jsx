function Actividades({ actividades }) {
  return (
    <ul aria-label="Actividades populares" className="flex flex-wrap gap-2">
      {actividades.map((actividad) => (
        <li key={actividad} className="rounded-full bg-primario/10 px-3 py-1 text-sm text-primario">
          {actividad}
        </li>
      ))}
    </ul>
  )
}

export default Actividades