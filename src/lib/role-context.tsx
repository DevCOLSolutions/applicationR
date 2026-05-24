import { createContext, useContext, useState, type ReactNode } from "react"

type Role = "mesero" | "admin" | null

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("role") as Role) ?? null
  })

  const handleSetRole = (newRole: Role) => {
    setRole(newRole)
    if (newRole) {
      localStorage.setItem("role", newRole)
    } else {
      localStorage.removeItem("role")
    }
  }

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) throw new Error("useRole must be used within RoleProvider")
  return context
}
