import { Table2 } from "lucide-react"

export function Mesas() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Table2 className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Mesas</h2>
      <p className="text-sm text-muted-foreground">Gestión de mesas</p>
    </div>
  )
}

export default Mesas
