import { Link } from "react-router-dom"

type Props = {}

const Error404 = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-dvh">
            <h1 className="text-[200px] font-light text-border opacity-25 mb-24">\(o_o)/</h1>
            <p className="mb-6 text-white font-h3">Denne side findes ikke</p>
            <Link className="border-solid border-2 border-[rgb(52,56,57)] bg-transparent text-white font-standard-medium py-3 mt-4 px-12  rounded-[14px] flex justify-center hover:bg-[rgb(52,56,57)] transition-colors duration-150" to="/">
                Tilbage til forsiden
            </Link>
        </div>
    )
}

export default Error404
