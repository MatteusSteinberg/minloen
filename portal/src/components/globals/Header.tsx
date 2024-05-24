import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import ProfileImage from "../../assets/images/jonas1.png"
import NotificationsMenu from "./NotificationsMenu"
import UserMenu from "./UserMenu"

interface IHeader {
    title: string
    history?: boolean
}

const Header = ({ title, history }: IHeader) => {
    return (
        <header className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-5">
                {history && (
                    <button className="flex items-center gap-2 text-primaryLight bg-gradientmain border border-solid border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-14 w-14 justify-center">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                )}
                <h1 className="-mt-2 text-white dark:text-black font-h2">{title}</h1>
            </div>
            <div className="relative z-50 flex items-center justify-center gap-5 p-4 rounded-xl bg-primarySupport">
                <NotificationsMenu />
                <UserMenu image={ProfileImage} />
            </div>
        </header>
    )
}

export default Header
