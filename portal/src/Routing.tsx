import { lazy, useState } from "react"

// Components
import { Route, Routes, matchPath, useLocation } from "react-router-dom"
import ProtectedRoute from "./components/globals/ProtectedRoute"
import Sidebar from "./components/globals/Sidebar"
import { useAuth } from "./hooks/use-auth"

// Pages
const Overview = lazy(() => import("./routes/overview"))
const Dashboard = lazy(() => import("./routes/dashboard"))
const PaymentDocuments = lazy(() => import("./routes/lønsedler"))
const DrivingCompensation = lazy(() => import("./routes/kørsel"))
const Absence = lazy(() => import("./routes/fravær"))
const Coworkers = lazy(() => import("./routes/medarbejdere"))
const NewCoworker = lazy(() => import("./routes/ny-medarbejder"))
const SeeCoworker = lazy(() => import("./routes/se-medarbejder"))
const AddPaycheck = lazy(() => import("./routes/addPaycheck"))
const Error404 = lazy(() => import("./routes/404"))
const Login = lazy(() => import("./routes/login"))
const Signup = lazy(() => import("./routes/signup"))
const Landing = lazy(() => import("./routes/Landing"))
const Pricing = lazy(() => import("./routes/pricing"))

interface IAppRoute {
    path: string
    element: React.ReactNode
    protected?: boolean
    layout?: boolean
    exact?: boolean
}

const routes: Array<IAppRoute> = [
    { path: "/", element: <Landing />, layout: false },
    { path: "/pricing", element: <Pricing />, layout: false },
    { path: "/overblik", element: <Overview />, layout: true, protected: true },
    { path: "/kontrolpanel", element: <Dashboard />, layout: true, protected: true },
    { path: "/loensedler", element: <PaymentDocuments />, layout: true, protected: true },
    { path: "/koersel", element: <DrivingCompensation />, layout: true, protected: true },
    { path: "/fravaer", element: <Absence />, layout: true, protected: true },
    { path: "/opret-loenseddel/:id", element: <AddPaycheck />, layout: true, protected: true },
    { path: "/medarbejdere", element: <Coworkers />, layout: true, protected: true },
    { path: "/ny-medarbejder", element: <NewCoworker />, layout: true, protected: true },
    { path: "/rediger-medarbejder/:id", element: <NewCoworker />, layout: true, protected: true },
    { path: "/se-medarbejder/:id", element: <SeeCoworker />, layout: true, protected: true },
    { path: "/signup", element: <Signup />, layout: false },
    { path: "/login", element: <Login />, layout: false },
]

const Routing = () => {
    const { user } = useAuth()
    const [showSidebar, setShowSidebar] = useState(true)
    const { pathname } = useLocation()

    const notfound = !routes.some((x) => matchPath(x.path, pathname))
    const route = routes.find((x) => (x.layout && (x.protected ? !!user : true) && !x.exact ? matchPath(x.path, pathname) : x.path === pathname))

    const protectedAndNoAuth = route?.protected && !user
    const showLayout = (route?.layout || notfound) && !protectedAndNoAuth

    return (
        <main className={`${notfound && "w-full"} ${showLayout && !notfound ? "md:pl-24 md:pr-6 p-0 bg-lightPrimary dark:bg-darkPrimarySupport h-screen" : "relative flex items-start justify-between w-full min-h-dvh"} ${showLayout && showSidebar ? "md:pl-24 lg:pl-80" : "pl-0"}`}>
            {showLayout && (
                <aside className={`fixed top-0 bottom-0 left-0 z-20 flex flex-col invisible opacity-0 pt-[120px] md:visible md:opacity-100 md:transition-opacity bg-lightPrimary dark:bg-darkPrimarySupport ${showSidebar ? "w-80 pb-[232px] px-4" : "w-16 pb-[120px] md:w-24 px-0 md:px-4 md:pb-[152px]"} `}>
                    <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
                </aside>
            )}
            <div className={`w-full bg-lightPrimary dark:bg-darkPrimarySupport flex min-h-screen ${showLayout ? "py-0 md:py-6" : " w-full"} min-h-screen-ios`}>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.protected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element} />
                    ))}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </main>
    )
}

export default Routing
