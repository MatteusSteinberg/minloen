import { Link } from "react-router-dom"

interface ICard {
    type: string
    icon: React.ReactNode
    title: string
    description: string
}

const Card = ({ description, icon, title, type }: ICard) => {
    return (
        <div className="px-6 py-6 bg-white border border-solid shadow-custom border-lightBorder dark:border-darkBorder rounded-2xl dark:bg-darkPrimarySupport">
            <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-4 pr-4">
                    <div className={`h-10 w-10 flex items-center justify-center rounded-full ${type === "warning" ? "bg-[rgba(253,154,82,0.10)]" : "bg-[#F5F7F3]"}`}>{icon}</div>
                    <div className="flex flex-col">
                        <p className="text-text dark:text-white font-standard-medium">{title}</p>
                        <p className={`font-small-medium ${type === "warning" ? "text-[#FD9A52]" : "text-text dartk:text-white opacity-30"}`}>{description}</p>
                    </div>
                </div>
                <Link to="/" className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">
                    Ændre
                </Link>
            </div>
        </div>
    )
}

export default Card
