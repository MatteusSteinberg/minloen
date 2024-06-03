import { XMarkIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useRef, useState } from "react"
import Portal from "../globals/Portal"

interface IBase {
    isOpen: boolean
    toggleModal: (v: boolean) => void
    className?: string
    children?: React.ReactNode
    title: string
    type?: string
    saveOnClick?: () => void
    submitText?: string
}

const Base = ({ isOpen, title, toggleModal, children, className, saveOnClick, submitText, type }: IBase) => {
    const [isClosing, setIsClosing] = useState<boolean>(false)
    const nodeRef = useRef<HTMLDivElement>(null)

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
            <div className={`fixed top-0 left-0 z-[100050] w-full h-full overflow-x-hidden bg-[rgba(0,0,0,0.5)] overflow-y-hidden outline md:px-5 transition-all duration-500 ease-[cubic-bezier(0.77, 0.2, 0.05, 1)] ${isOpen ? "opacity-100" : "opacity-0"} ${isClosing ? "opacity-0" : ""}`}>
                <div className="relative w-full md:w-auto h-full pointer-events-auto z-[1075] flex items-center md:max-w-[650px] mx-auto">
                    <div className={`relative flex flex-col w-full text-white pointer-events-auto bg-darkPrimarySupport bg-clip-padding rounded-2xl outline-0 max-h-full my-[50px] border border-solid border-darkBorder ${isOpen ? "animate-inAnimation" : ""} ${isClosing ? "animate-outAnimation" : ""}`}>
                        <div className="flex items-center justify-between px-12 py-6">
                            <h4 className="font-h4">{title}</h4>
                            <button className="absolute flex items-center justify-center w-10 h-10 border border-solid bg-gradientmain text-darkPrimaryLight align right-6 rounded-xl border-darkBorder" onClick={handleClose}>
                                <XMarkIcon className="h-[24px] w-[24px]" />
                            </button>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default Base
