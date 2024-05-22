import { lazy } from "react"

// Components
import { Route, Routes, matchPath, useLocation } from "react-router-dom"
import Sidebar from "./components/globals/Sidebar"

// Pages
const Dashboard = lazy(() => import("./routes/dashboard"))
const Login = lazy(() => import("./routes/login"))
const Signup = lazy(() => import("./routes/signup"))

interface IAppRoute {
    path: string
    element: React.ReactNode
    protected?: boolean
    layout?: boolean
    exact?: boolean
}

const routes: Array<IAppRoute> = [
    { path: "/", element: <Dashboard />, layout: true },
    { path: "/signup", element: <Signup />, layout: false },
    { path: "/login", element: <Login />, layout: false },
]

const Routing = () => {
    const { pathname } = useLocation()

    const route = routes.find((x) => (!x.exact ? matchPath(x.path, pathname) : x.path === pathname))
    const showLayout = route?.layout

    return (
        <main className={`relative flex items-start justify-between w-full ${showLayout && "p-6"} min-h-dvh`}>
            {showLayout && (
                <aside className="max-w-[320px] relative w-full min-h-[calc(100dvh-48px)]">
                    <Sidebar />
                </aside>
            )}
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </main>
    )
}

export default Routing
