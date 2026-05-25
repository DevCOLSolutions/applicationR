import type { User } from "./mock-data"
import { getMockUsers } from "./mock-data"

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchUsersByRole(role: "mesero" | "admin"): Promise<User[]> {
  await delay(300)
  return getMockUsers().filter((u) => u.role === role)
}

export async function login(userId: string): Promise<User> {
  await delay(400)
  const user = getMockUsers().find((u) => u.id === userId)
  if (!user) throw new Error("Usuario no encontrado")
  return user
}

export async function logout(): Promise<void> {
  await delay(200)
}
