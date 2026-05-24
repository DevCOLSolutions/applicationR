import { Clock } from "lucide-react"

export function Pendientes() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Clock className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Pendientes</h2>
      <p className="text-sm text-muted-foreground">Órdenes pendientes</p>
    </div>
  )
}

export default Pendientes
