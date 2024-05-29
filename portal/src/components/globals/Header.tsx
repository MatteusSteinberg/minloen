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
                <h1 className="-mt-2 text-black dark:text-white font-h2">{title}</h1>
            </div>
            <div className="relative z-50 flex items-center justify-center gap-5 p-5 border border-solid md:p-4 rounded-xl bg-lightPrimarySupport dark:bg-primarySupport border-borderLight dark:border-none">
                <button className="relative z-[25] gap-1 shrink-0 flex flex-col items-center justify-center w-8 h-8 ml-auto tap-highlight-color md:hidden">
                    <span className="w-7 h-[3px] bg-border rounded-full transition-all"></span>
                    <span className="w-7 h-[3px] bg-border rounded-full transition-all"></span>
                </button>
                <div className="items-center justify-center hidden gap-5 md:flex">
                    <NotificationsMenu />
                    <UserMenu image={ProfileImage} />
                </div>
            </div>
        </header>
    )
}

export default Header
