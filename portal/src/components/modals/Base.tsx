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
            <div></div>
        </Portal>
    )
}

export default Base
