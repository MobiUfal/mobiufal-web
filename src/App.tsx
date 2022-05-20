import { AuthProvider } from './hooks/useAuth'
import { Routes } from './Routes'

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}