import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RoleProvider } from "@/lib/role-context.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
