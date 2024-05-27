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
            <div className={`fixed top-0 left-0 z-[100050] w-full h-full overflow-x-hidden bg-[rgba(0,0,0,0.5)] overflow-y-hidden outline px-5 transition-all duration-500 ease-[cubic-bezier(0.77, 0.2, 0.05, 1)] ${isOpen ? "opacity-100" : "opacity-0"} ${isClosing ? "opacity-0" : ""}`}>
                <div className="relative w-auto h-full pointer-events-auto z-[1075] flex items-center max-w-[650px] mx-auto">
                    <div className={`relative flex flex-col w-full text-white pointer-events-auto bg-primarySupport bg-clip-padding rounded-2xl outline-0 max-h-full my-[50px] ${isOpen ? "animate-inAnimation" : ""} ${isClosing ? "" : "animate-outAnimation"}`}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default Base
