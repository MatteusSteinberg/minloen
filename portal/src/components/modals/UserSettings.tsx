import { BellAlertIcon, LockClosedIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import Portal from "../globals/Portal"
import ChangeProfile from "../layouts/userSettings/ChangeProfile"

interface IUserSettings {
    isOpen: boolean
    toggleModal: (isOpen: boolean) => void
}

export type EditProfilePages = "#profile-settings" | "#password-settings" | "#notification-settings"

const UserSettings = ({ isOpen, toggleModal }: IUserSettings) => {
    const [isClosing, setIsClosing] = useState<boolean>(false)

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

    if (!isOpen) return null

    return (
        <Portal wrapperId="modal">
            <div className={`fixed top-0 left-0 z-[100050] w-full h-full overflow-x-hidden bg-[rgba(0,0,0,0.5)] overflow-y-hidden outline px-5 transition-all duration-500 ease-[cubic-bezier(0.77, 0.2, 0.05, 1)] ${isOpen ? "opacity-100" : "opacity-0"} ${isClosing ? "opacity-0" : ""}`}>
                <div className="relative w-auto h-full pointer-events-auto z-[1075] flex items-center max-w-[750px] mx-auto">
                    <div className={`relative flex flex-col w-full text-white pointer-events-auto bg-secondarySupport py-12 px-12 bg-clip-padding rounded-2xl outline-0 max-h-full my-[50px] ${isOpen ? "animate-inAnimation" : ""} ${isClosing ? "animate-outAnimation" : ""}`}>
                        <div className="flex items-start justify-between gap-[72px]">
                            <div className="flex flex-col gap-2">
                                <button className="max-w-[200px] w-full flex flex-row items-center justify-start gap-2 px-6 py-3 border-2 border-solid rounded-full border-primaryLight">
                                    <MapPinIcon className="w-6 h-6 text-primaryLight" />
                                    <span className="-mt-1">Ændre profil</span>
                                </button>
                                <button className="max-w-[200px] w-full flex flex-row items-center justify-start gap-2 px-6 py-3">
                                    <LockClosedIcon className="w-6 h-6 text-primaryLight" />
                                    <span className="-mt-1">Password</span>
                                </button>
                                <button className="max-w-[200px] w-full flex flex-row items-center justify-start gap-2 px-6 py-3">
                                    <BellAlertIcon className="w-6 h-6 text-primaryLight" />
                                    <span className="-mt-1">Notifikationer</span>
                                </button>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-[42px] w-full">
                                <ChangeProfile />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default UserSettings
