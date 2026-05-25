export interface User {
  id: string
  name: string
  email: string
  role: "mesero" | "admin"
}

const users: User[] = [
  { id: "mes-1", name: "Carlos López", email: "carlos@rest.com", role: "mesero" },
  { id: "mes-2", name: "María García", email: "maria@rest.com", role: "mesero" },
  { id: "mes-3", name: "José Pérez", email: "jose@rest.com", role: "mesero" },
  { id: "adm-1", name: "Ana Martínez", email: "ana@rest.com", role: "admin" },
  { id: "adm-2", name: "Luis Rodríguez", email: "luis@rest.com", role: "admin" },
]

export function getMockUsers() {
  return users
}
