import React from "react"

interface IButton {
    background: "primary" | "primaryLight" | "primarySupport" | "secondarySupport" | "tertiarySupport" | "error" | "success" | "gradient" | "text" | "border" | "white" | "black"
    color: "primary" | "primaryLight" | "primarySupport" | "secondarySupport" | "tertiarySupport" | "error" | "success" | "gradient" | "text" | "border" | "white" | "black"
    variant: "filled" | "outline"
    icon?: React.ReactNode
    children: React.ReactNode
    onClick?: () => void
}

const Button = ({ background, color, variant, icon, onClick, children }: IButton) => {
    return (
        <button className={`text-${color} rounded-2xl border-solid border-[1px] border-${background} py-[17px] px-16 ${variant === "filled" && `bg-${background}`} ${variant === "outline" && "bg-transparent"} flex justify-center align items-center gap-3`}>
            {icon && <div className={`text-${color} w-[20px] h-[20px]`}>{icon}</div>}
            <span className="uppercase font-small-semibold">{children}</span>
        </button>
    )
}

export default Button
