import React, { useState } from "react"

interface IButton {
  background: "primary" | "primaryLight" | "primarySupport" | "secondarySupport"
  color: "text" | "white"
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void | Promise<void>
}

const Button = ({ background, color, icon, onClick, children }: IButton) => {
  const [loading, setLoading] = useState(false)

  const innerOnClick = async () => {
    if (!onClick) return
    const onClickResult = onClick()

    if (onClickResult instanceof Promise) {
      setLoading(true)
      await onClickResult
      setLoading(false)
    }
  }

  return (
    <button onClick={innerOnClick}>
      {background === "primary" && (
        <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-primary border-primary py-[17px] px-16 flex justify-center align items-center gap-3`}>
          {icon && <div className={`text-${color} w-[20px] h-[20px]`}>{icon}</div>}
          <span className="uppercase font-small-semibold">{children}</span>
        </div>
      )}
      {background === "primaryLight" && (
        <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-primaryLight border-primaryLight py-[17px] px-16 flex justify-center align items-center gap-3`}>
          {icon && <div className={`text-${color} w-[20px] h-[20px]`}>{icon}</div>}
          <span className="uppercase font-small-semibold">{children}</span>
        </div>
      )}
      {background === "primarySupport" && (
        <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-primarySupport border-primarySupport py-[17px] px-16 flex justify-center align items-center gap-3`}>
          {icon && <div className={`text-${color} w-[20px] h-[20px]`}>{icon}</div>}
          <span className="uppercase font-small-semibold">{children}</span>
        </div>
      )}
      {background === "secondarySupport" && (
        <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-secondarySupport border-secondarySupport py-[17px] px-16 flex justify-center align items-center gap-3`}>
          {icon && <div className={`text-${color} w-[20px] h-[20px]`}>{icon}</div>}
          <span className="uppercase font-small-semibold">{children}</span>
        </div>
      )}
    </button>
  )
}

export default Button