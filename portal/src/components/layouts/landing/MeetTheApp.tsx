import { Link } from "react-router-dom"
import Forside from "../../../assets/images/Forside.png"
import Fravær from "../../../assets/images/Fravær.png"
import Lønsedler from "../../../assets/images/Lønsedler.png"

type Props = {}

const MeetTheApp = (props: Props) => {
    return (
        <section className="relative w-full h-full pt-20 bg-gradientsecondary">
            <div className="flex flex-col items-center justify-center">
                <p className="mb-6 text-white font-standard-medium">Vi har også en app</p>
                <h3 className="font-default font-medium text-[38px] sm:text-[56px] mb-4 text-white text-center">Mød MinLøn appen!</h3>
                <p className="text-white font-default font-normal max-w-[560px] px-8 text-center leading-[26px]">Med vores løn app gør vi det nemt for dine medarbejdere atkunne holde overblik over sine lønsedler og fraværsdage</p>
                <Link to="/" className="py-5 mt-10 text-white px-7 font-medium-medium bg-lightPrimary rounded-2xl">
                    Download fra app store
                </Link>
            </div>
            <div className="flex items-center justify-center gap-2 px-10 mt-20 lg:gap-16 lg:px-40 ">
                <div className="">
                    <img src={Forside} />
                </div>
                <div className="">
                    <img src={Lønsedler} />
                </div>
                <div className="">
                    <img src={Fravær} />
                </div>
            </div>
        </section>
    )
}

export default MeetTheApp
