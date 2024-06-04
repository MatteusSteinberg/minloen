import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import ProfileImage from "../../assets/images/jonas1.png"
import UserMenu from "./UserMenu"

interface IHeader {
    title: string
    history?: string
}

const Header = ({ title, history }: IHeader) => {
    const navigate = useNavigate()

    const handleHistoryClick = () => {
        if (history) navigate(history, { replace: true })
    }

    return (
        <header className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-5">
                {history && (
                    <button onClick={handleHistoryClick} className="flex items-center gap-2 text-lightSecondaryLight dark:text-darkPrimaryLight bg-lightPrimary dark:bg-gradientmain border border-solid border-lightBorder dark:border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-14 w-14 justify-center">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                )}
                <h1 className="-mt-2 text-text dark:text-white font-default font-semibold text-[24px] sm:font-h2">{title}</h1>
            </div>
            <div className="relative z-50 items-center justify-center hidden gap-5 p-5 md:p-4 rounded-xl bg-lightPrimary dark:bg-darkPrimarySupport md:flex">
                <div className="items-center justify-center hidden gap-5 md:flex">
                    {/* <NotificationsMenu /> */}
                    <UserMenu image={ProfileImage} />
                </div>
            </div>
        </header>
    )
}

export default Header
