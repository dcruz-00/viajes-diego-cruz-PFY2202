// aria-pressed: los lectores de pantalla anuncian si la opción está elegida.
// "descripcion" completa el texto solo para lectores de pantalla ("Elegir vuelo AA 412").
function BotonElegir({ seleccionado, disabled = false, onClick, descripcion }) {
  return (
    <button
      type="button"
      aria-pressed={seleccionado}
      disabled={disabled}
      onClick={onClick}
      className={`mt-3 w-full rounded px-4 py-2 font-semibold sm:w-auto ${
        seleccionado
          ? 'bg-primario text-white'
          : 'border border-primario text-primario hover:bg-primario/10'
      } disabled:cursor-not-allowed disabled:border-borde disabled:bg-fondo disabled:text-texto-suave`}
    >
      {seleccionado ? 'Elegido ✓' : 'Elegir'}
      <span className="sr-only"> {descripcion}</span>
    </button>
  )
}

export default BotonElegir