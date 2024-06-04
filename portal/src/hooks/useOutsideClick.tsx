import { useCallback, useEffect, useRef, useState } from "react"

type Handler = (show: boolean) => void

export const useOutsideClick = (initialState: boolean, buttonRef: React.RefObject<HTMLButtonElement>): [boolean, React.RefObject<HTMLDivElement>, Handler] => {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(initialState)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setIsVisible(false)
        }
    }, [ref, buttonRef, setIsVisible]);

    const toggleVisibility = (show: boolean) => {
        setIsVisible(show)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])

    return [isVisible, ref, toggleVisibility]
}
