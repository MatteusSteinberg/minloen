import { ChevronDownIcon, ClipboardDocumentIcon, FaceFrownIcon, MoonIcon, Squares2X2Icon, SunIcon, TruckIcon, UsersIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useLocalStorage } from "react-use"
import ProfileImage from "../../assets/images/jonas1.png"
import { useAuth } from "../../hooks/use-auth"

interface ILinkProps {
    link: string
    icon: React.ReactNode
    text: string
}

const Links: ILinkProps[] = [
    {
        link: "/overblik",
        icon: <Squares2X2Icon className="inline-block w-6 h-6" />,
        text: "Overview",
    },
    {
        link: "/loensedler",
        icon: <ClipboardDocumentIcon className="inline-block w-6 h-6" />,
        text: "Lønsedler",
    },
    {
        link: "/koersel",
        icon: <TruckIcon className="inline-block w-6 h-6" />,
        text: "Kørsel",
    },
    {
        link: "/fravaer",
        icon: <FaceFrownIcon className="inline-block w-6 h-6" />,
        text: "Sygedage / Fravær",
    },
]

const AdminLinks: ILinkProps[] = [
    {
        link: "/kontrolpanel",
        icon: <Squares2X2Icon className="inline-block w-6 h-6" />,
        text: "Dashboard",
    },
    {
        link: "/medarbejdere",
        icon: <UsersIcon className="inline-block w-6 h-6" />,
        text: "Medarbejdere",
    },
]

interface ISidebar {
    showSidebar: boolean
    setShowSidebar: (value: boolean) => void
}

const Sidebar = ({ setShowSidebar, showSidebar }: ISidebar) => {
    const [hideAdmin, setHideAdmin] = useState(false)
    const [isDarkMode, setIsDarkMode] = useLocalStorage("colormode", false)

    const { user } = useAuth()

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const toggleTheme = () => setIsDarkMode(!isDarkMode)

    if (!isDarkMode) {
        document.documentElement.classList.remove("dark")
    } else {
        document.documentElement.classList.add("dark")
    }

    return (
        <>
            <div className={`absolute top-0 left-0 right-0 flex items-center pr-6 h-[120px] pl-7 ${showSidebar ? "justify-between" : "justify-center"}`}>
                {showSidebar && (
                    <svg width="167" height="38" viewBox="0 0 167 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.3456 19C38.3456 29.4934 29.7601 38 19.1693 38C9.58797 38 1.64786 31.0378 0.221254 21.9408L4.29602 22.7999C5.99935 29.3641 12.0126 34.2148 19.1693 34.2148C27.6502 34.2148 34.5253 27.4029 34.5253 19C34.5253 10.5971 27.6502 3.78516 19.1693 3.78516C10.6884 3.78516 3.81323 10.5971 3.81323 19C3.81323 19.0949 3.81411 19.1896 3.81585 19.284L0 18.4795C0.278292 8.22675 8.75414 0 19.1693 0C29.7601 0 38.3456 8.50659 38.3456 19Z" fill="#CDE4BA" />
                        <path
                            d="M19.1072 7.05095C18.9092 7.05372 18.7138 7.09081 18.532 7.16009C18.3503 7.22937 18.1859 7.32949 18.0481 7.45474C17.9104 7.57998 17.802 7.7279 17.7291 7.89004C17.6563 8.05217 17.6205 8.22536 17.6237 8.39969V9.83339C14.7169 10.3936 12.3529 12.2494 12.3529 14.8593C12.3529 17.9471 15.4888 20.3153 19.1313 20.3153C21.3325 20.3153 22.8944 21.6322 22.8944 23.1163C22.8944 24.6005 21.3325 25.912 19.1313 25.912C16.9301 25.912 15.3682 24.6005 15.3682 23.1163C15.3984 21.3215 12.3228 21.3215 12.3529 23.1163C12.3529 25.7288 14.7139 27.5873 17.6237 28.1449V29.6051C20.639 31.5801 20.639 32.2852 20.639 29.6051V28.421C23.594 27.8741 25.973 25.7687 25.9097 23.1216C25.9097 19.5852 23.3226 17.6656 19.1313 17.6656C16.9301 17.6656 15.3682 16.3487 15.3682 14.8646C15.3682 13.4017 16.894 12.1167 19.0469 12.0822C19.1041 12.0859 19.1615 12.0868 19.2188 12.0848C21.3717 12.1246 22.8944 13.4017 22.8944 14.8646C22.8643 16.662 25.9399 16.662 25.9097 14.8646C25.9097 12.2149 23.594 10.1069 20.639 9.55992V8.39969C20.6422 8.22178 20.6048 8.04511 20.529 7.88017C20.4532 7.71524 20.3405 7.56541 20.1976 7.4396C20.0547 7.31378 19.8845 7.21454 19.6972 7.14777C19.5099 7.08101 19.3092 7.04808 19.1072 7.05095Z"
                            fill="#CDE4BA"
                        />
                        <path d="M49.6073 29.8835V6.39866H53.9526L62.1371 23.1044L70.3391 6.39866H74.6669V29.8835H70.9673V13.0567L63.4459 28.2233H60.8283L53.3069 13.0567V29.8835H49.6073Z" className="fill-white" />
                        <path d="M79.9894 7.71299C79.9894 6.46784 80.862 5.60316 82.1185 5.60316C83.3749 5.60316 84.2649 6.46784 84.2649 7.71299C84.2649 8.95813 83.3749 9.82282 82.1185 9.82282C80.862 9.82282 79.9894 8.95813 79.9894 7.71299ZM83.8461 29.8835H80.3908V13.2816H83.8461V29.8835Z" className="fill-white" />
                        <path d="M92.6065 29.8835H89.1512V13.2816H92.6239V15.3741C93.1824 14.5267 94.7704 12.9357 97.772 12.9357C102.379 12.9357 104.805 15.7718 104.805 19.8013V29.8835H101.349V20.5276C101.349 17.7779 99.8312 16.1869 97.231 16.1869C94.6832 16.1869 92.6065 17.7779 92.6065 20.5276V29.8835Z" className="fill-white" />
                        <path d="M127.474 26.5804V29.8835H110.302V6.39866H113.984V26.5804H127.474Z" className="fill-white" />
                        <path
                            d="M142.569 13.9214L145.465 10.4108L147.542 12.2439L144.802 15.5643C146.303 17.1035 147.211 19.2133 147.211 21.5825C147.211 26.4421 143.406 30.2294 138.311 30.2294C136.583 30.2294 135.012 29.797 133.669 29.0361L130.615 32.737L128.538 30.9038L131.522 27.2894C130.196 25.7676 129.411 23.7961 129.411 21.5825C129.411 16.723 133.215 12.9357 138.311 12.9357C139.881 12.9357 141.312 13.2988 142.569 13.9214ZM133.738 24.6089L140.405 16.5328C139.776 16.2907 139.061 16.1523 138.311 16.1523C135.152 16.1523 132.866 18.5215 132.866 21.5825C132.866 22.7239 133.18 23.7615 133.738 24.6089ZM142.638 18.193L135.815 26.4593C136.548 26.8052 137.386 27.0127 138.311 27.0127C141.469 27.0127 143.755 24.6435 143.755 21.5825C143.755 20.2855 143.336 19.1095 142.638 18.193Z"
                            className="fill-white"
                        />
                        <path d="M154.802 29.8835H151.346V13.2816H154.819V15.3741C155.378 14.5267 156.966 12.9357 159.967 12.9357C164.574 12.9357 167 15.7718 167 19.8013V29.8835H163.545V20.5276C163.545 17.7779 162.026 16.1869 159.426 16.1869C156.878 16.1869 154.802 17.7779 154.802 20.5276V29.8835Z" className="fill-white" />
                    </svg>
                )}
                <button className="h-[20px] w-[20px] bg-lightSecondaryLight dark:bg-[#6C7275] rounded-[3px] relative" onClick={() => toggleSidebar()}>
                    <div className={`w-[8px] h-[calc(100%-4px)] bg-lightPrimary dark:bg-darkSecondarySupport absolute top-1/2 -translate-y-1/2 rounded-[2px] ${showSidebar ? "right-[3px]" : "left-[2px]"} `} />
                </button>
            </div>
            <div className="h-full overflow-y-auto grow scroll-smooth no-scrollbar">
                <div className={showSidebar ? "px-0" : "px-2"}>
                    {Links.map((link: ILinkProps, index: number) => (
                        <NavLink to={link.link} className={`outline-0 w-full flex items-center h-12 font-normal text-[15px] font-default text-[rgba(255,255,255,0.6)] dark:text-[rgba(232,236,239,.75)] rounded-lg duration-150 transition-all dark:hover:text-white ${showSidebar ? "px-5" : "px-3"}`}>
                            {link.icon}
                            {showSidebar && <span className="ml-5 -mt-[3px]">{link.text}</span>}
                        </NavLink>
                    ))}
                </div>
                {user?.organizationRole === "admin" && (
                    <>
                        <div className="my-4 h-[1px] bg-lightSecondaryLight dark:bg-darkBorder dark:opacity-10 -mx-2 md:mx-0" />
                        <div className="pb-6 mb-auto">
                            <button onClick={() => setHideAdmin(!hideAdmin)} className="flex items-center h-12 font-light text-[13px] font-default text-[rgba(255,255,255,0.5)] dark:text-[rgba(232,236,239,.75)] rounded-lg px-[23px]">
                                <ChevronDownIcon className={`stroke-2 inline-block w-5 h-5 transition-transform duration-150 ${hideAdmin ? "rotate-180" : "rotate-0"}`} />
                                {showSidebar && <span className="ml-5 -mt-[3px]">Admin navigation</span>}
                            </button>
                            <div className={`${hideAdmin ? "invisible" : "visible"} ${showSidebar ? "px-0" : "px-2"}`}>
                                {AdminLinks.map((link: ILinkProps) => (
                                    <NavLink to={link.link} className={`w-full flex items-center h-12 font-normal text-[15px] font-default text-[rgba(255,255,255,0.6)] dark:text-[rgba(232,236,239,.75)] rounded-lg transition-all dark:hover:text-white ${showSidebar ? "px-5" : "px-3"}`}>
                                        {link.icon}
                                        {showSidebar && <span className="ml-5 -mt-[3px]">{link.text}</span>}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="absolute left-0 bottom-0 right-0 pb-6 dark:bg-darkPrimarySupport px-3 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 dark:before:bg-gradient-to-t dark:before:from-[#131617] dark:before:to-[rgba(19,22,23,0)] dark:before:pointer-events-none md:px-4">
                <div className={`mb-3 rounded-[14px] border border-solid border-lightBorder dark:border-none ${showSidebar ? "bg-lightSecondary dark:bg-darkSecondarySupport dark:shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]" : "bg-transparent shadow-none flex justify-center border-none"}`}>
                    {showSidebar ? (
                        <div className="p-2.5 rounded-xl">
                            <div className="flex items-start relative justify-between px-2.5 py-2.5 pb-4.5">
                                <div className="flex items-center">
                                    <div className="relative w-10 h-10">
                                        <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-2 rounded-full border-4 overflow-hidden">
                                            <img src={ProfileImage} alt="profile" />
                                        </div>
                                    </div>
                                    <div className="ml-4 mr-4">
                                        <p className="truncate text-text dark:text-white font-standard-normal">{user?.name}</p>
                                        <p className="text-text dark:text-white font-small-normal opacity-30">{user?.email}</p>
                                    </div>
                                </div>
                                <p className="px-3 py-1 rounded-full font-default text-[12px] font-bold bg-lightPrimaryLight dark:bg-darkPrimaryLight leading-[15px] uppercase absolute right-0">Free</p>
                            </div>
                            <Link className="border-solid border-2 border-lightPrimary dark:border-[rgb(52,56,57)] bg-lightPrimary dark:bg-transparent text-white font-standard-medium py-3 mt-4 w-full rounded-[14px] flex justify-center hover:bg-lightSecondaryLight hover:border-lightSecondaryLight dark:hover:border-[rgb(52,56,57)] dark:hover:bg-[rgb(52,56,57)] transition-colors duration-150" to="/pricing">
                                Upgrade til Pro
                            </Link>
                        </div>
                    ) : (
                        <div className="relative w-10 h-10">
                            <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full overflow-hidden">
                                <img src={ProfileImage} alt="profile" />
                            </div>
                        </div>
                    )}
                </div>
                <div className={`relative flex justify-center w-full p-1 bg-lightSecondary dark:bg-darkSecondarySupport rounded-xl ${showSidebar && "before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-lightPrimary dark:before:bg-darkPrimarySupport before:rounded-[0.625rem] before:transition-all"} ${isDarkMode ? "before:translate-x-full" : "before:translate-x-0"}`}>
                    {showSidebar ? (
                        <>
                            <button onClick={() => toggleTheme()} className={`relative flex items-center justify-center font-standard-medium transition-colors z-1 group basis-1/2 hover:text-white ${!isDarkMode ? "text-white" : "text-[#6C7275]"} ${showSidebar ? "h-10" : "h-16"}`}>
                                <SunIcon className={`inline-block w-6 h-6 mr-3 transition-colors group-hover:stroke-white ${!isDarkMode ? "stroke-white" : "stroke-[#6C7275]"}`} />
                                {showSidebar && <span className="-mt-1">Light</span>}
                            </button>
                            <button onClick={() => toggleTheme()} className={`relative flex items-center justify-center font-standard-medium transition-colors z-1 group basis-1/2 hover:text-text dark:hover:text-white ${isDarkMode ? "text-white" : "text-[#6C7275]"}  ${showSidebar ? "h-10" : "h-16"}`}>
                                <MoonIcon className={`inline-block w-6 h-6 mr-3 transition-colors group-hover:stroke-text dark:group-hover:stroke-white ${isDarkMode ? "stroke-white" : "stroke-[#6C7275]"}`} />
                                {showSidebar && <span className="-mt-1">Dark</span>}
                            </button>
                        </>
                    ) : (
                        <>
                            {isDarkMode && (
                                <button onClick={() => toggleTheme()} className={`relative items-center justify-center font-standard-medium transition-colors z-1 hover:text-white ${isDarkMode ? "text-white" : "text-[#6C7275]"} h-14`}>
                                    <SunIcon className={`inline-block w-6 h-6 transition-colors group-hover:stroke-white ${isDarkMode ? "stroke-white" : "stroke-[#6C7275]"}`} />
                                </button>
                            )}
                            {!isDarkMode && (
                                <button onClick={() => toggleTheme()} className={`relative flex items-center  font-standard-medium transition-colors z-1 hover:text-text dark:hover:text-white ${!isDarkMode ? "text-text dark:text-white" : "text-[#6C7275]"} h-14`}>
                                    <MoonIcon className={`inline-block w-6 h-6 transition-colors group-hover:stroke-white ${!isDarkMode ? "stroke-lightPrimary" : "stroke-[#6C7275]"}`} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar