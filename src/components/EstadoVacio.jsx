function EstadoVacio({ mensaje, children }) {
  return (
    <div className="my-4 rounded-lg border border-dashed border-borde p-6 text-center">
      <p className="text-texto-suave">{mensaje}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}

export default EstadoVacio