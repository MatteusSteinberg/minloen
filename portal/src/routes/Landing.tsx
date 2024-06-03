import { AnimatePresence } from "framer-motion"
import AdminImage from "../assets/images/Frame 857 2.png"
import CheckImage from "../assets/images/Group 685.png"
import Footer from "../components/layouts/landing/Footer"
import Hero from "../components/layouts/landing/Hero"
import Logos from "../components/layouts/landing/Logos"
import MeetTheApp from "../components/layouts/landing/MeetTheApp"
import Navigation from "../components/layouts/landing/Navigation"
import TextImage from "../components/layouts/landing/TextImage"

type Props = {}

const Landing = (props: Props) => {
    return (
        <AnimatePresence mode="wait">
            <div className="relative w-full h-full overflow-hidden bg-white">
                <Navigation />
                <div className="absolute overflow-hidden -right-72 -top-72">
                    <svg width="1162" height="1207" viewBox="0 0 1162 1207" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_397_3769)">
                            <g filter="url(#filter0_f_397_3769)">
                                <ellipse cx="477" cy="472.5" rx="234" ry="196.5" fill="url(#paint0_linear_397_3769)" />
                            </g>
                            <g filter="url(#filter1_f_397_3769)">
                                <circle cx="658.5" cy="669.5" r="261.5" fill="url(#paint1_linear_397_3769)" />
                            </g>
                        </g>
                        <defs>
                            <filter id="filter0_f_397_3769" x="-7" y="26" width="968" height="893" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_397_3769" />
                            </filter>
                            <filter id="filter1_f_397_3769" x="147" y="158" width="1023" height="1023" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_397_3769" />
                            </filter>
                            <linearGradient id="paint0_linear_397_3769" x1="711" y1="276" x2="243" y2="669" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#CDE4BA" />
                                <stop offset="1" stop-color="#FF9DCE" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_397_3769" x1="397" y1="931" x2="920" y2="408" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#74EAA3" />
                                <stop offset="1" stop-color="#FF9DCE" />
                            </linearGradient>
                            <clipPath id="clip0_397_3769">
                                <rect width="1162" height="1207" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="max-w-[1440px] px-4 md:px-10 lg:px-20 relative mx-auto h-full min-h-dvh">
                    <Hero />
                    <Logos />
                    <TextImage orientation="left" color="lightPrimary" tag="Administrering" title="Nem administrering af ansatte" link="/" linkText="Se funktioner" text="Vores system gør det nemt og danner overblik over alle dine medarbejder og gør det nemt at holde styr på deres informationer">
                        <div className="absolute bottom-0 left-0">
                            <img src={AdminImage} alt="Something here" />
                        </div>
                    </TextImage>
                    <TextImage orientation="right" color="lightPrimaryLight" tag="Lønsedler" title="Lønsedler på den nemme måde" link="/" linkText="Se udkast af lønseddel" text="Ved MinLøn gør vi det nemmere for dig at kunne holde styr på dine medarbejders lønsedler og sørger for at du kan oprette og redigere kommende lønsedler">
                        <div className="absolute -translate-x-1/2 left-1/2 w-full 301 -translate-y-1/2 top-1/2 max-w-[401px] h-auto">
                            <img src={CheckImage} alt="Something here" />
                        </div>
                    </TextImage>
                </div>
                <MeetTheApp />
                <Footer />
            </div>
        </AnimatePresence>
    )
}

export default Landing
