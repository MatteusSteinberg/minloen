import { lazy, useState } from "react"

// Components
import { Route, Routes, matchPath, useLocation } from "react-router-dom"
import Sidebar from "./components/globals/Sidebar"
import Error404 from "./routes/404"

// Pages
const Dashboard = lazy(() => import("./routes/dashboard"))
const PaymentDocuments = lazy(() => import("./routes/lønsedler"))
const DrivingCompensation = lazy(() => import("./routes/kørsel"))
const Absence = lazy(() => import("./routes/fravær"))
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
    { path: "/lønsedler", element: <PaymentDocuments />, layout: true },
    { path: "/kørsel", element: <DrivingCompensation />, layout: true },
    { path: "/fravær", element: <Absence />, layout: true },
    { path: "/signup", element: <Signup />, layout: false },
    { path: "/login", element: <Login />, layout: false },
]

const Routing = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const { pathname } = useLocation()

    const notfound = !routes.some((x) => matchPath(x.path, pathname))
    const route = routes.find((x) => (!x.exact ? matchPath(x.path, pathname) : x.path === pathname))
    const showLayout = route?.layout || notfound

    return (
        <main className={`${notfound && "w-full"} ${showLayout && !notfound ? "pr-6 bg-primarySupport h-screen" : "relative flex items-start justify-between w-full min-h-dvh"} ${showLayout && showSidebar ? "pl-80" : "pl-24"}`}>
            {showLayout && !notfound && (
                <aside className={`fixed top-0 bottom-0 left-0 z-20 flex flex-col invisible opacity-0 pt-[120px] md:visible md:opacity-100 md:transition-opacity ${showSidebar ? "w-80 pb-[232px] px-4" : "w-16 pb-[120px] md:w-24 px-0 md:px-4 md:pb-[152px]"} `}>
                    <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
                </aside>
            )}
            <div className={`flex min-h-screen ${showLayout ? "py-0 md:py-6" : " w-full"} min-h-screen-ios`}>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </main>
    )
}

export default Routing
