import { useAuth } from "../../hooks/use-auth"
import Login from "../../routes/login"

const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth()
    return user ? children : <Login noRedirect={true} />
}

export default ProtectedRoute
