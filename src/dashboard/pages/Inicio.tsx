import { Home } from "lucide-react"

export function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Home className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Inicio</h2>
      <p className="text-sm text-muted-foreground">Bienvenido al Dashboard</p>
    </div>
  )
}

export default Inicio
