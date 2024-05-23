import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Import the icon from Heroicons
import React, { useEffect, useRef, useState } from "react";

interface IButton {
    background: "primary" | "primaryLight" | "primarySupport" | "secondarySupport";
    color: "text" | "white";
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void | Promise<void>;
}

const Button = ({ background, color, icon, onClick, children }: IButton) => {
    const [loading, setLoading] = useState(false);
    const [buttonSize, setButtonSize] = useState({ width: 'auto', height: 'auto' });
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            const { offsetWidth, offsetHeight } = buttonRef.current;
            setButtonSize({ width: `${offsetWidth}px`, height: `${offsetHeight}px` });
        }
    }, []);

    const innerOnClick = async () => {
        if (!onClick) return;
        const onClickResult = onClick();

        if (onClickResult instanceof Promise) {
            setLoading(true);
            await onClickResult;
            setLoading(false);
        }
    };

    const renderButtonContent = () => {
        if (loading) {
            return <ArrowPathIcon className="w-5 h-5 text-white animate-spin" />;
        }
        return (
            <>
                {icon && <div className={`text-${color} w-[20px] h-[20px]`}>{icon}</div>}
                <span className="uppercase font-small-semibold">{children}</span>
            </>
        );
    };

    return (
        <button
            onClick={innerOnClick}
            disabled={loading}
            ref={buttonRef}
            style={{ width: buttonSize.width, height: buttonSize.height }}
        >
            {background === "primary" && (
                <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-primary border-primary py-[17px] px-16 flex justify-center items-center gap-3`}>
                    {renderButtonContent()}
                </div>
            )}
            {background === "primaryLight" && (
                <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-primaryLight border-primaryLight py-[17px] px-16 flex justify-center items-center gap-3`}>
                    {renderButtonContent()}
                </div>
            )}
            {background === "primarySupport" && (
                <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-primarySupport border-primarySupport py-[17px] px-16 flex justify-center items-center gap-3`}>
                    {renderButtonContent()}
                </div>
            )}
            {background === "secondarySupport" && (
                <div className={`text-${color} rounded-2xl border-solid border-[1px] bg-secondarySupport border-secondarySupport py-[17px] px-16 flex justify-center items-center gap-3`}>
                    {renderButtonContent()}
                </div>
            )}
        </button>
    );
};

export default Button;
