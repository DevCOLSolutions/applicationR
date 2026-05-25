import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom"
import { Home, Table2, Settings, Clock, Users, ClipboardList, Plus, UtensilsCrossed, LogOut, ChefHat, Activity } from "lucide-react"
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

const adminNav: NavItem[] = [
  { to: "/dashboard", icon: Home, label: "Inicio", end: true },
  { to: "/dashboard/mesas", icon: Table2, label: "Mesas" },
  { to: "/dashboard/usuarios", icon: Users, label: "Usuarios" },
  { to: "/dashboard/ordenes", icon: ClipboardList, label: "Órdenes" },
  { to: "/dashboard/configuraciones", icon: Settings, label: "Config." },
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

// ── ADMIN sidebar ───────────────────────────────────────────────────────────
function AdminSidebar({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  return (
    <aside className="hidden md:flex md:flex-col h-full bg-blue-50 border-r border-blue-100">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-blue-100 px-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
          <Users className="size-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-blue-700 leading-tight">Admin</p>
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

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 pt-5">
        <p className="mb-1 px-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">Panel</p>
        {adminNav.map((item) => (
          <AdminSidebarLink key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 py-5">
        <div className="rounded-xl border border-blue-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-2">Sistema</p>
          <div className="flex items-center gap-2">
            <Activity className="size-3.5 text-emerald-500" />
            <span className="text-[11px] text-slate-500">Operativo</span>
            <span className="ml-auto size-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function AdminSidebarLink({ to, icon: Icon, label, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-white text-blue-700 shadow-sm"
            : "text-slate-500 hover:bg-white/70 hover:text-slate-700",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className={cn(
            "flex size-7 items-center justify-center rounded-lg transition-all",
            isActive ? "bg-blue-100" : "bg-slate-100",
          )}>
            <Icon className="size-3.5" strokeWidth={isActive ? 2.5 : 1.8} />
          </span>
          {label}
          {isActive && (
            <span className="ml-auto size-1.5 rounded-full bg-blue-500" />
          )}
        </>
      )}
    </NavLink>
  )
}

// ── Layout root ─────────────────────────────────────────────────────────────
export function DashboardLayout() {
  const { user, logout: authLogout } = useAuthStore()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/" replace />

  const role = user.role

  const handleLogout = async () => {
    await logout()
    authLogout()
    navigate("/")
  }

  return (
    <div className={cn(
      "flex min-h-dvh",
      role === "mesero" ? "bg-orange-50/40" : "bg-blue-50/40",
      "md:grid md:grid-cols-[240px_1fr]",
    )}>
      {role === "mesero" ? (
        <MeseroSidebar userName={user.name} onLogout={handleLogout} />
      ) : (
        <AdminSidebar userName={user.name} onLogout={handleLogout} />
      )}

      {role === "mesero" ? <MeseroMobileNav /> : <AdminMobileNav />}

      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
