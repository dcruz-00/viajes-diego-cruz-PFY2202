// Texto de estado que acompaña a los esqueletos. role="status" lo anuncia sin interrumpir.
function AvisoCarga({ mensaje, intento = 1, maxIntentos }) {
  const texto = intento > 1 ? `Reintentando… (intento ${intento} de ${maxIntentos})` : mensaje

  return (
    <p role="status" className="mb-3 text-sm text-texto-suave">
      {texto}
    </p>
  )
}

export default AvisoCarga