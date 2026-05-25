import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UtensilsCrossed, ShieldCheck, Loader2 } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { login } from "@/lib/mock-api"

export function RoleSelector() {
  const [loading, setLoading] = useState<"mesero" | "admin" | null>(null)
  const authLogin = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSelectRole = async (role: "mesero" | "admin") => {
    setLoading(role)
    const user = await login(role === "mesero" ? "mes-1" : "adm-1")
    authLogin(user)
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
          onClick={() => handleSelectRole("mesero")}
          disabled={loading !== null}
          className="flex items-center gap-4 rounded-xl border p-5 text-left transition-colors hover:bg-muted active:bg-muted/80 disabled:opacity-60"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {loading === "mesero" ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <UtensilsCrossed className="size-6" />
            )}
          </div>
          <div>
            <div className="font-medium">Mesero</div>
            <div className="text-sm text-muted-foreground">
              Tomar órdenes y gestionar mesas
            </div>
          </div>
        </button>

        <button
          onClick={() => handleSelectRole("admin")}
          disabled={loading !== null}
          className="flex items-center gap-4 rounded-xl border p-5 text-left transition-colors hover:bg-muted active:bg-muted/80 disabled:opacity-60"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {loading === "admin" ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <ShieldCheck className="size-6" />
            )}
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
