import { Link } from "react-router-dom"

interface ICard {
  type: string
  userId?: string
  icon: React.ReactNode
  title: string
  description: string
}

const Card = ({ description, icon, title, type }: ICard) => {
  return (
    <div className="p-4 bg-white border border-solid sm:px-6 sm:py-6 shadow-custom border-lightBorder dark:border-darkBorder rounded-2xl dark:bg-darkPrimarySupport">
      <div className="flex flex-col justify-between gap-4 sm:gap-0 sm:items-center sm:flex-row">
        <div className="flex flex-row gap-4 sm:items-center sm:pr-4">
          <div className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full ${type === "warning" ? "bg-[rgba(253,154,82,0.10)]" : "bg-[#F5F7F3]"}`}>{icon}</div>
          <div className="flex flex-col">
            <p className="text-text dark:text-white font-standard-medium">{title}</p>
            <p className={`font-small-medium ${type === "warning" ? "text-[#FD9A52]" : "text-text dark:text-white opacity-30"}`}>{description}</p>
          </div>
        </div>
        <Link to="/rediger-medarbejder/6655bc9347505857aaf417ed" className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">
          Ændre
        </Link>
      </div>
    </div>
  )
}

export default Card
