import { Navigate, NavLink, Outlet } from "react-router-dom"
import { Home, Table2, Settings, Clock, Users, ClipboardList, Plus, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store"
import { logout } from "@/lib/mock-api"

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

const adminBottomNav: {
  to: string
  icon: typeof LayoutGrid
  label: string
  end?: boolean
  isCenter?: boolean
}[] = [
  { to: "/dashboard/mesas", icon: LayoutGrid, label: "Tables" },
  { to: "/dashboard/configuraciones", icon: UtensilsCrossed, label: "Menu" },
  { to: "/dashboard", icon: Cog, label: "ADMIN", end: true, isCenter: true },
  { to: "/dashboard/stats", icon: BarChart3, label: "Stats" },
]

// ── MESERO mobile nav ───────────────────────────────────────────────────────
function MeseroMobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-orange-100 bg-white px-3 py-2 shadow-xl shadow-orange-100/60">
      <MobileNavLink {...meseroNav[0]} accentColor="#ea580c" />
      <MobileNavLink {...meseroNav[1]} accentColor="#ea580c" />
      <NavLink
        to="/dashboard/nueva-orden"
        className="mx-2 flex size-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-300 transition-all active:scale-90 hover:bg-orange-600"
      >
        <Plus className="size-5" strokeWidth={2.5} />
      </NavLink>
      <MobileNavLink {...meseroNav[2]} accentColor="#ea580c" />
      <MobileNavLink {...meseroNav[3]} accentColor="#ea580c" />
    </nav>
  )
}

// ── ADMIN mobile nav ────────────────────────────────────────────────────────
function AdminMobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-blue-100 bg-white px-3 py-2 shadow-xl shadow-blue-100/60">
      {adminNav.map((item) => (
        <MobileNavLink key={item.to} {...item} accentColor="#2563eb" />
      ))}
    </nav>
  )
}

function MobileNavLink({
  to,
  icon: Icon,
  label,
  end,
  accentColor = "#ea580c",
}: NavItem & { accentColor?: string }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-semibold tracking-wide transition-all",
          isActive ? "bg-orange-50" : "text-slate-400 hover:text-slate-600",
        )
      }
      style={({ isActive }) => (isActive ? { color: accentColor } : {})}
    >
      <Icon className="size-[18px]" />
      <span>{label}</span>
    </NavLink>
  )
}

// ── MESERO sidebar ──────────────────────────────────────────────────────────
function MeseroSidebar({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  return (
    <aside className="hidden md:flex md:flex-col h-full bg-orange-50 border-r border-orange-100">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-orange-100 px-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500 shadow-md shadow-orange-200">
          <UtensilsCrossed className="size-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-orange-600 leading-tight">Mesero</p>
          <p className="text-xs text-slate-400 leading-none">{userName}</p>
        </div>
        <button
          onClick={onLogout}
          className="ml-auto text-slate-300 hover:text-red-400 transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="size-4" />
        </button>
      </div>

      {/* Nueva orden CTA */}
      <div className="px-4 pt-5 pb-3">
        <NavLink
          to="/dashboard/nueva-orden"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition-all hover:bg-orange-600 active:scale-[0.97]"
        >
          <Plus className="size-4" strokeWidth={2.5} />
          Nueva orden
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 pt-1">
        <p className="mb-1 px-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">Menú</p>
        {meseroNav.map((item) => (
          <MeseroSidebarLink key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 py-5">
        <div className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-center shadow-sm">
          <ChefHat className="mx-auto mb-1 size-5 text-orange-400" />
          <p className="text-[11px] text-slate-400">Servicio activo</p>
        </div>
      </div>
    </aside>
  )
}

function MeseroSidebarLink({ to, icon: Icon, label, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-white text-orange-600 shadow-sm"
            : "text-slate-500 hover:bg-white/70 hover:text-slate-700",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className={cn(
            "flex size-7 items-center justify-center rounded-lg transition-all",
            isActive ? "bg-orange-100" : "bg-slate-100",
          )}>
            <Icon className="size-3.5" strokeWidth={isActive ? 2.5 : 1.8} />
          </span>
          {label}
          {isActive && (
            <span className="ml-auto size-1.5 rounded-full bg-orange-500" />
          )}
        </>
      )}
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
