import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import NotificationsMenu from "./NotificationsMenu"
import UserMenu from "./UserMenu"
import { profileImage } from '../../lib/utils/profileImage'
import { useAuth } from '../../hooks/use-auth'

interface IHeader {
    title: string
    history?: string
}

const Header = ({ title, history }: IHeader) => {
    const navigate = useNavigate()
    const { user } = useAuth()

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
                <h1 className="-mt-2 text-text dark:text-white font-h2">{title}</h1>
            </div>
            <div className="relative z-50 flex items-center justify-center gap-5 p-5 md:p-4 rounded-xl bg-lightPrimary dark:bg-darkPrimarySupport">
                <button className="relative z-[25] gap-1 shrink-0 flex flex-col items-center justify-center w-8 h-8 ml-auto tap-highlight-color md:hidden">
                    <span className="w-7 h-[3px] bg-darkBorder rounded-full transition-all"></span>
                    <span className="w-7 h-[3px] bg-darkBorder rounded-full transition-all"></span>
                </button>
                <div className="items-center justify-center hidden gap-5 md:flex">
                    <NotificationsMenu />
                    <UserMenu image={profileImage({ userId: user?._id})} />
                </div>
            </div>
        </header>
    )
}

export default Header
