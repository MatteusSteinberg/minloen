import { AnimatePresence } from "framer-motion"
import Footer from "../components/layouts/landing/Footer"
import MeetTheApp from "../components/layouts/landing/MeetTheApp"
import Navigation from "../components/layouts/landing/Navigation"
import PricingHero from "../components/layouts/landing/PricingHero"

type Props = {}

const Pricing = (props: Props) => {
    return (
        <AnimatePresence mode="wait">
            <div className="relative w-full h-full overflow-hidden bg-white">
                <Navigation />
                <div className="absolute overflow-hidden right-28 -top-12">
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
                    <PricingHero />
                </div>
                <MeetTheApp />
                <Footer />
            </div>
        </AnimatePresence>
    )
}

export default Pricing
