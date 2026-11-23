import { Routes, Route } from 'react-router'
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx'
import DetalleDestino from '../pages/DetalleDestino.jsx'
import Inicio from '../pages/Inicio.jsx'
import ListadoDestinos from '../pages/ListadoDestinos.jsx'
import NoEncontrado from '../pages/NoEncontrado.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />
        <Route path="destinos">
          <Route index element={<ListadoDestinos />} />
          <Route path=":id" element={<DetalleDestino />} />
        </Route>
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes