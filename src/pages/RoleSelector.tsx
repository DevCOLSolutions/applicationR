import { useNavigate } from "react-router-dom"
import { useRole } from "@/lib/role-context"
import { UtensilsCrossed, ShieldCheck } from "lucide-react"

export function RoleSelector() {
  const { setRole } = useRole()
  const navigate = useNavigate()

  const selectRole = (role: "mesero" | "admin") => {
    setRole(role)
    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Seleccioná tu rol para continuar
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-4">
        <button
          onClick={() => selectRole("mesero")}
          className="flex items-center gap-4 rounded-xl border p-5 text-left transition-colors hover:bg-muted active:bg-muted/80"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UtensilsCrossed className="size-6" />
          </div>
          <div>
            <div className="font-medium">Mesero</div>
            <div className="text-sm text-muted-foreground">
              Tomar órdenes y gestionar mesas
            </div>
          </div>
        </button>

        <button
          onClick={() => selectRole("admin")}
          className="flex items-center gap-4 rounded-xl border p-5 text-left transition-colors hover:bg-muted active:bg-muted/80"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <div className="font-medium">Admin</div>
            <div className="text-sm text-muted-foreground">
              Administrar el sistema
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default RoleSelector
