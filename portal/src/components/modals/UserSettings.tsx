import { LockClosedIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import Dropdown, { DropdownOption } from "../elements/Dropdown"
import Portal from "../globals/Portal"
import ChangePassword from "../layouts/userSettings/ChangePassword"
import ChangeProfile from "../layouts/userSettings/ChangeProfile"

interface IUserSettings {
    isOpen: boolean
    toggleModal: (isOpen: boolean) => void
}

const UserSettings = ({ isOpen, toggleModal }: IUserSettings) => {
    const [selectedComponent, setSelectedComponent] = useState("profile")
    const [isClosing, setIsClosing] = useState<boolean>(false)
    const modalRef = useRef(null)

    const handleSelectChange = (value: any) => {
        setSelectedComponent(value)
    }

    useEffect(() => {
        if (isOpen) document.body.classList.add("sc-modal-open")
    }, [isOpen])

    const handleClose = () => {
        if (isOpen) {
            setIsClosing(true)
            setTimeout(() => {
                toggleModal(false)
                setIsClosing(false)
            }, 260)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
                handleClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalRef])

    if (!isOpen) return null

    const activeClass = "border-lightPrimary dark:border-darkPrimaryLight text-lightPrimary dark:text-white "
    const inActiveClass = "border-lightSecondary dark:border-darkSecondarySupport text-lightBorder dark:text-darkBorder "

    const options: DropdownOption[] = [
        { value: "profile", label: "Ændre profil" },
        { value: "password", label: "Password" },
    ]

    return (
        <Portal wrapperId="modal">
            <div className={`fixed top-0 left-0 z-[100050] w-full h-full overflow-x-hidden bg-[rgba(0,0,0,0.5)] overflow-y-hidden outline md:px-5 transition-all duration-500 ease-[cubic-bezier(0.77, 0.2, 0.05, 1)] ${isOpen ? "opacity-100" : ""} ${isClosing ? "opacity-0" : ""}`}>
                <div className="relative w-full md:w-auto h-full pointer-events-auto z-[1075] flex items-center md:max-w-[750px] mx-auto" ref={modalRef}>
                    <div className={`relative md:max-h-[650px] h-full flex flex-col w-full text-text dark:text-white pointer-events-auto bg-lightSecondary dark:bg-darkSecondarySupport xs:py-12 px-4 py-4 xs:px-8 sm:p-12 bg-clip-padding md:rounded-2xl outline-0 my-[50px] ${isOpen ? "animate-inAnimation" : ""} ${isClosing ? "animate-outAnimation" : ""}`}>
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 md:gap-[72px] h-full">
                            <div className="block w-full sm:hidden">
                                <Dropdown name="userSettings" placeholder="Vælg indstillinger" onChange={handleSelectChange} value={selectedComponent} options={options} />
                            </div>
                            <div className="flex-col gap-2 md:max-w-[220px] md:w-full hidden sm:flex">
                                <button onClick={() => setSelectedComponent("profile")} className={`md:max-w-[200px] md:w-full w-[51px] h-[51px] flex flex-row items-center justify-center md:justify-start gap-2 md:px-6 md:py-3 border-2 border-solid rounded-2xl md:rounded-full ${selectedComponent === "profile" ? activeClass : inActiveClass}`}>
                                    <MapPinIcon className={`w-6 h-6 ${selectedComponent === "profile" ? "text-lightPrimary dark:text-darkPrimaryLight" : "text-lightBorder dark:text-darkBorder"}`} />
                                    <span className="hidden -mt-1 md:block">Ændre profil</span>
                                </button>
                                <button onClick={() => setSelectedComponent("password")} className={`md:max-w-[200px] md:w-full w-[51px] h-[51px] flex flex-row items-center justify-center md:justify-start gap-2 md:px-6 md:py-3 border-2 border-solid rounded-2xl md:rounded-full ${selectedComponent === "password" ? activeClass : inActiveClass}}`}>
                                    <LockClosedIcon className={`w-6 h-6 ${selectedComponent === "password" ? "text-lightPrimary dark:text-darkPrimaryLight" : "text-lightBorder dark:text-darkBorder"}`} />
                                    <span className="hidden -mt-1 md:block">Password</span>
                                </button>
                            </div>
                            <div className="flex flex-col items-start justify-between h-full gap-[42px] w-full">
                                {selectedComponent === "profile" && <ChangeProfile handleClose={handleClose} />}
                                {selectedComponent === "password" && <ChangePassword handleClose={handleClose} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default UserSettings
