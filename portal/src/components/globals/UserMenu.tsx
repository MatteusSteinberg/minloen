import { useRef } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"

interface IUserMenu {
    image: string
}

const UserMenu = ({ image }: IUserMenu) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [toggleMenu, node, setToggleMenu] = useOutsideClick(false, buttonRef)

    return (
        <>
            <button ref={buttonRef} className="relative w-10 h-10 rounded-full group" onClick={() => setToggleMenu(!toggleMenu)}>
                <img src={image} alt="ProfileImage" className="block w-full h-full rounded-full" />
            </button>
            <div ref={node} className={`absolute transition-all duration-150 md:right-0 transform ${toggleMenu ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
                <div className="absolute top-full -right-[158px] md:right-0 w-[286px] mt-10 p-4 bg-primarySupport border border-solid border-[rgba(51,54,62,0.50)] rounded-2xl shadow-[0px_48px_64px_-16px_rgba(0,0,0,0.25)]">
                    <div className="flex items-center gap-4">
                        <img src={image} alt="ProfileImage" className="rounded-full w-14 h-14" />
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="text-white font-default font-medium text-[18px] leading-6 dark:text-text -mt-1">Tobias Thien Tran</p>
                            <p className="text-white opacity-30 font-default font-light text-[14px] dark:text-text">IT-Supporter Elev</p>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 mt-3 bg-secondarySupport rounded-2xl">
                        <button className="flex items-center w-full h-12 text-white transition-colors dark:text-dark group font-standard-medium hover:text-primaryLight">
                            <svg className="inline-block w-6 h-6 mr-4 fill-[#6c7275] transition-colors group-hover:fill-primaryLight" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 1c.478 0 .946.136 1.346.393s.717.622.911 1.053l.657 1.446a2.68 2.68 0 0 0 1.117 1.228 2.75 2.75 0 0 0 1.641.343l1.597-.167a2.5 2.5 0 0 1 1.381.252c.426.214.78.545 1.018.952s.353.875.328 1.345a2.41 2.41 0 0 1-.469 1.304l-.945 1.28c-.337.457-.519 1.007-.518 1.572s.177 1.119.514 1.578l.945 1.28a2.41 2.41 0 0 1 .469 1.304c.025.47-.089.937-.328 1.345s-.593.739-1.018.952a2.5 2.5 0 0 1-1.381.252l-1.596-.167a2.75 2.75 0 0 0-1.641.343 2.68 2.68 0 0 0-1.116 1.222l-.652 1.446c-.194.43-.511.796-.911 1.053a2.5 2.5 0 0 1-2.693 0c-.401-.257-.717-.622-.911-1.053l-.653-1.446a2.68 2.68 0 0 0-1.121-1.228 2.75 2.75 0 0 0-1.641-.343l-1.597.168c-.475.049-.955-.038-1.381-.252s-.78-.544-1.019-.952-.353-.875-.328-1.345a2.41 2.41 0 0 1 .469-1.304l.945-1.28c.337-.457.519-1.007.519-1.572s-.181-1.115-.519-1.572l-.945-1.28a2.41 2.41 0 0 1-.469-1.304c-.025-.47.089-.937.328-1.345s.593-.739 1.018-.952a2.5 2.5 0 0 1 1.381-.252l1.602.167a2.75 2.75 0 0 0 1.641-.343A2.68 2.68 0 0 0 9.09 3.892l.653-1.446c.194-.43.511-.796.911-1.053S11.522 1 12 1zm0 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                            </svg>
                            <span className="-mt-1">Skift indstillinger</span>
                        </button>
                        <button className="flex items-center w-full h-12 text-white transition-colors dark:text-dark group font-standard-medium hover:text-primaryLight">
                            <svg className="inline-block w-6 h-6 mr-4 fill-[#6c7275] transition-colors group-hover:fill-primaryLight" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M6.234 2.386c.496.02 1.101.087 1.837.169l1.101.122.608.082a4 4 0 0 1 3.205 3.581c.015.172.015.36.015.614v.443c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437c-.19.097-.432.108-.877.109H9a3 3 0 0 0 0 6h2.4c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437c.109.214.109.494.109 1.054v.443l-.015.614a4 4 0 0 1-3.205 3.581c-.169.034-.356.054-.608.082l-1.063.118h-.002l-.036.004-1.837.169c-.511.02-.989-.005-1.453-.154a4 4 0 0 1-2.433-2.177c-.199-.445-.277-.917-.313-1.427l-.034-1.241V7.386l.034-1.241c.036-.51.114-.982.313-1.427A4 4 0 0 1 4.781 2.54c.465-.149.942-.174 1.453-.154zM16.707 6.29l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414l3.293-3.293H9a1 1 0 0 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 1.414-1.414z"></path>
                            </svg>
                            <span className="-mt-1">Log ud</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserMenu
