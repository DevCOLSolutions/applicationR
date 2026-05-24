import { Navigate, NavLink, Outlet } from "react-router-dom"
import { Home, Table2, Settings, Clock, Users, ClipboardList, Plus, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"

type NavItem = {
  to: string
  icon: typeof Home
  label: string
  end?: boolean
}

const meseroNav: NavItem[] = [
  { to: "/dashboard", icon: Home, label: "Inicio", end: true },
  { to: "/dashboard/mesas", icon: Table2, label: "Mesas" },
  { to: "/dashboard/pendientes", icon: Clock, label: "Pendientes" },
  { to: "/dashboard/configuraciones", icon: Settings, label: "Config." },
]

const adminNav: NavItem[] = [
  { to: "/dashboard", icon: Home, label: "Inicio", end: true },
  { to: "/dashboard/mesas", icon: Table2, label: "Mesas" },
  { to: "/dashboard/usuarios", icon: Users, label: "Usuarios" },
  { to: "/dashboard/ordenes", icon: ClipboardList, label: "Órdenes" },
  { to: "/dashboard/configuraciones", icon: Settings, label: "Config." },
]

function NavLinkItem({ to, icon: Icon, label, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-xs font-medium transition-colors",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
        )
      }
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </NavLink>
  )
}

function SidebarLinkItem({ to, icon: Icon, label, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )
      }
    >
      <Icon className="size-4" />
      {label}
    </NavLink>
  )
}

export function DashboardLayout() {
  const { role, setRole } = useRole()

  if (!role) return <Navigate to="/" replace />

  const roleLabel = role === "mesero" ? "Mesero" : "Admin"
  const RoleIcon = role === "mesero" ? UtensilsCrossed : Users

  return (
    <div className="flex min-h-dvh bg-background md:grid md:grid-cols-[240px_1fr]">
      {/* Mobile bottom nav */}
      <nav className="safe-bottom fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t bg-background px-2 pb-safe-or-2 pt-1 md:hidden">
        {role === "mesero" ? (
          <>
            <NavLinkItem {...meseroNav[0]} />
            <NavLinkItem {...meseroNav[1]} />
            <div className="relative flex items-center justify-center">
              <button className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95 -mt-5">
                <Plus className="size-7" />
              </button>
            </div>
            <NavLinkItem {...meseroNav[2]} />
            <NavLinkItem {...meseroNav[3]} />
          </>
        ) : (
          adminNav.map((item) => <NavLinkItem key={item.to} {...item} />)
        )}
      </nav>



      {/* Desktop sidebar */}
      <aside className="hidden border-r bg-muted/30 md:flex md:flex-col md:pb-0">
        <div className="flex h-14 items-center gap-2 border-b px-5 font-semibold">
          <RoleIcon className="size-5" />
          <span className="text-lg">{roleLabel}</span>
        </div>

        <div className="flex items-center justify-between gap-2 border-b px-5 py-2 text-xs text-muted-foreground">
          <span>{roleLabel}</span>
          <button
            onClick={() => setRole(null)}
            className="text-xs underline hover:text-foreground"
          >
            Cambiar rol
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {role === "mesero" ? (
            <>
              <SidebarLinkItem {...meseroNav[0]} />
              <SidebarLinkItem {...meseroNav[1]} />
              <div className="my-1">
                <button className="flex w-full items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors active:scale-[0.98]">
                  <Plus className="size-4" />
                  Nueva orden
                </button>
              </div>
              <SidebarLinkItem {...meseroNav[2]} />
              <SidebarLinkItem {...meseroNav[3]} />
            </>
          ) : (
            adminNav.map((item) => <SidebarLinkItem key={item.to} {...item} />)
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
