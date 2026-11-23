import { Routes, Route } from 'react-router'
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx'
import Inicio from '../pages/Inicio.jsx'
import NoEncontrado from '../pages/NoEncontrado.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes