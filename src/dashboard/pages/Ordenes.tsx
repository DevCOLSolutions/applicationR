import { ClipboardList } from "lucide-react"

export function Ordenes() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <ClipboardList className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Órdenes</h2>
      <p className="text-sm text-muted-foreground">Órdenes activas</p>
    </div>
  )
}

export default Ordenes
