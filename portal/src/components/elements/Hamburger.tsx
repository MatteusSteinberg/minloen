interface IHamburger {
    color: "darkBorder" | "text" | "lightPrimary"
    active: boolean
    setActive: (active: boolean) => void
}

const Hamburger = ({ color, active, setActive }: IHamburger) => {
    return (
        <button className="relative z-[25] gap-1 shrink-0 flex flex-col items-center justify-center w-8 h-8 ml-auto tap-highlight-color md:hidden" onClick={() => setActive(!active)}>
            <span className={`w-7 h-[3px] bg-${color} rounded-full transition-all origin-center ${active ? "rotate-45 translate-y-[4px]" : "rotate-0"}`}></span>
            <span className={`w-7 h-[3px] bg-${color} rounded-full transition-all origin-center ${active ? "-rotate-45 -translate-y-[3px]" : "rotate-0"}`}></span>
        </button>
    )
}

export default Hamburger
