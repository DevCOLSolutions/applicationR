import { Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/dashboard/DashboardLayout"
import RoleSelector from "@/pages/RoleSelector"
import Inicio from "@/dashboard/pages/Inicio"
import Mesas from "@/dashboard/pages/Mesas"
import Configuraciones from "@/dashboard/pages/Configuraciones"
import Ordenes from "@/dashboard/pages/Ordenes"
import Pendientes from "@/dashboard/pages/Pendientes"
import Usuarios from "@/dashboard/pages/Usuarios"
import Stats from "@/dashboard/pages/Stats"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelector />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Inicio />} />
        <Route path="mesas" element={<Mesas />} />
        <Route path="configuraciones" element={<Configuraciones />} />
        <Route path="ordenes" element={<Ordenes />} />
        <Route path="pendientes" element={<Pendientes />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="stats" element={<Stats />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
