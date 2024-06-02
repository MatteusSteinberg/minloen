import { Link } from "react-router-dom"

interface ITextImage {
    orientation: string
    children?: React.ReactNode
    title?: string
    text?: string
    tag?: string
    color?: "lightPrimary" | "lightPrimaryLight"
    link?: string
    linkText?: string
}

const TextImage = ({ orientation, children, text, title, color, tag, link, linkText }: ITextImage) => {
    return (
        <section className={`py-[88px] flex ${orientation === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col w-full relative items-center gap-12`}>
            <div className="w-full">
                {tag && <span className={`mb-4 inline-block rounded-full border-solid border-[3px] border-${color} py-2 px-[14px] text-${color}`}>{tag}</span>}
                <h3 className="max-w-[532px] text-[38px] sm:text-[54px] font-semibold font-default text-text leading-[44px] sm:leading-[56px]">{title}</h3>
                <p className="max-w-[440px] mt-4 text-text font-default font-normal leading-[30px] text-[18px]">{text}</p>
                <Link to={link || "/"} className="inline-flex items-center gap-4 pb-2 border-b border-solid text-text border-text mt-[62px] text-[18px]">
                    {linkText}
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.125 4.15625L15.75 9.78125M15.75 9.78125L10.125 15.4062M15.75 9.78125H2.25" stroke="#252525" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </Link>
            </div>
            <div className="w-full bg-[#F9FAFB] rounded-3xl min-h-[350px] sm:min-h-[472px] relative">{children}</div>
        </section>
    )
}

export default TextImage
