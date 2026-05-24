import { Users } from "lucide-react"

export function Usuarios() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Users className="size-12 text-muted-foreground" />
      <h2 className="text-lg font-medium">Usuarios</h2>
      <p className="text-sm text-muted-foreground">Gestión de usuarios</p>
    </div>
  )
}

export default Usuarios
