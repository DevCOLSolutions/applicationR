import { BarChart3 } from "lucide-react"

export function Stats() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <BarChart3 className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Estadísticas</h2>
      <p className="text-sm text-muted-foreground">
        Reportes de ventas, tiempos y rendimiento
      </p>
    </div>
  )
}

export default Stats
