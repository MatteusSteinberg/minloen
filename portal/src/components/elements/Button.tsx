import React from 'react'

interface IButton {
    background: "primary" | "primaryLight" | "primarySupport" | "secondarySupport" | "tertiarySupport" | "error" | "success" | "gradient" | "text" | "border" | "white" | "black"
    color: "primary" | "primaryLight" | "primarySupport" | "secondarySupport" | "tertiarySupport" | "error" | "success" | "gradient" | "text" | "border" | "white" | "black"
    variant: "filled" | "outline"
    icon?: React.ReactNode
    children: React.ReactNode
    onClick?: () => void
    hover: 
}

const Button = ({ background, color, variant, icon, onClick, children }: IButton) => {
    return (
        <button className={`bg-${background}, text-${color}, variant-${variant}, `}>
            {icon && icon}
            <span>
                {children}
            </span>
        </button>
    )
}

export default Button