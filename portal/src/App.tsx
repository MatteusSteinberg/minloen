import { Toaster } from "react-hot-toast"
import { BrowserRouter as Router } from "react-router-dom"
import Routing from "./Routing"
import { AuthProvider } from "./hooks/use-auth"
import "./tailwind.css"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routing />
            </Router>
            <Toaster position="bottom-center" reverseOrder={false} />
        </AuthProvider>
    )
}

export default App
