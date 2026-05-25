import { Navigate, NavLink, Outlet } from "react-router-dom"
import { Home, Table2, Settings, Clock, Users, ClipboardList, Plus, UtensilsCrossed, ListFilter, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store"

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

const meseroBottomItems = [
  { to: "/dashboard", icon: Home, label: "home", end: true },
  { to: "/dashboard/mesas", icon: ListFilter },
  { to: "/dashboard/pendientes", icon: User },
  { to: "/dashboard/configuraciones", icon: Settings },
]

function SidebarLink({ to, icon: Icon, label, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-orange-100 text-orange-600"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
        )
      }
    >
      <Icon className="size-4" />
      {label}
    </NavLink>
  )
}

export function DashboardLayout() {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/" replace />

  const role = user.role

  if (role === "mesero") return <MeseroLayout userName={user.name} />
  return <AdminLayout userName={user.name} />
}

function MeseroLayout({ userName }: { userName: string }) {
  return (
    <div className="flex min-h-dvh bg-white md:grid md:grid-cols-[240px_1fr]">
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <Outlet />
      </main>

      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 md:hidden">
        <span className="mb-0.5 ml-3 block text-[10px] font-medium text-slate-400">
          expandable
        </span>
        <nav className="flex items-center gap-1 rounded-full border border-slate-200/50 bg-slate-100/80 p-1.5 shadow-sm">
          {meseroBottomItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-white px-4 py-2 text-slate-800 shadow-sm"
                    : "px-3 py-2 text-slate-400 hover:text-slate-600",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="size-4 shrink-0" />
                  {isActive && label && (
                    <span className="overflow-hidden text-xs font-medium whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <aside className="hidden md:flex md:flex-col h-full bg-orange-50 border-r border-orange-100">
        <div className="flex h-16 items-center gap-3 border-b border-orange-100 px-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500 shadow-md shadow-orange-200">
            <UtensilsCrossed className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-bold text-orange-600 leading-tight">Mesero</p>
            <p className="text-xs text-slate-400 leading-none">{userName}</p>
          </div>
        </div>

        <div className="px-4 pt-5 pb-3">
          <NavLink
            to="/dashboard/nueva-orden"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition-all hover:bg-orange-600 active:scale-[0.97]"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            Nueva orden
          </NavLink>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 pt-1">
          <p className="mb-1 px-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">Menú</p>
          {meseroNav.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>
      </aside>
    </div>
  )
}

function AdminLayout({ userName }: { userName: string }) {
  return (
    <div className="flex min-h-dvh bg-white md:grid md:grid-cols-[240px_1fr]">
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <Outlet />
      </main>

      <nav className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-slate-200/50 bg-slate-100/80 p-1.5 shadow-sm md:hidden">
        {adminNav.map(({ to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center rounded-full px-3 py-2 text-slate-400 transition-all duration-300",
                isActive && "bg-white text-slate-800 shadow-sm",
              )
            }
          >
            <Icon className="size-4" />
          </NavLink>
        ))}
      </nav>

      <aside className="hidden md:flex md:flex-col h-full bg-blue-50 border-r border-blue-100">
        <div className="flex h-16 items-center gap-3 border-b border-blue-100 px-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500 shadow-md shadow-blue-200">
            <Users className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-600 leading-tight">Admin</p>
            <p className="text-xs text-slate-400 leading-none">{userName}</p>
          </div>
        </div>

        <div className="px-4 pt-5 pb-3">
          <NavLink
            to="/dashboard/ordenes"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-600 active:scale-[0.97]"
          >
            <ClipboardList className="size-4" strokeWidth={2.5} />
            Ver órdenes
          </NavLink>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 pt-1">
          <p className="mb-1 px-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">Menú</p>
          {adminNav.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>
      </aside>
    </div>
  )
}

export default DashboardLayout
