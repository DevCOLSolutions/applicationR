import { Settings } from "lucide-react"

export function Configuraciones() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Settings className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Configuraciones</h2>
      <p className="text-sm text-muted-foreground">Ajustes del sistema</p>
    </div>
  )
}

export default Configuraciones
