import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import PDF from "./PDF"

type Props = {}

const Hero = (props: Props) => {
    const titleParent = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.03,
            },
        },
    }

    const titleChild = {
        initial: {
            y: 100,
            opacity: 0,
            transition: {
                ease: [0.85, 0, 0.15, 1],
                duration: 1.2,
            },
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.85, 0, 0.15, 1],
                duration: 1,
            },
        },
    }

    const text = {
        initial: {
            y: 100,
            opacity: 0,
            transition: {
                ease: [0.85, 0, 0.15, 1],
                duration: 1,
                delay: 0.1,
            },
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.85, 0, 0.15, 1],
                duration: 1,
                delay: 0.1,
            },
        },
    }

    const button = {
        initial: {
            y: 100,
            opacity: 0,
            transition: {
                ease: [0.85, 0, 0.15, 1],
                duration: 1,
                delay: 0.2,
            },
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.85, 0, 0.15, 1],
                duration: 1,
                delay: 0.2,
            },
        },
    }

    return (
        <>
            <section className="relative lg:items-start justify-center lg:justify-between w-full gap-8 py-[calc(88px+64px)] min-h-dvh lg:min-h-[calc(100vh-88px-64px)] h-full flex flex-col lg:flex-row">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <motion.h1 animate="animate" initial="initial" variants={titleParent} className="font-default font-semibold text-[42px] xs:text-[52px] sm:text-[65px] xl:text-[75px] xxl:text-[95px] text-text leading-1 flex flex-col">
                            <motion.span variants={titleChild}>Effektivt.</motion.span>
                            <motion.span variants={titleChild} className="text-lightPrimary">
                                Automatisk.
                            </motion.span>
                            <motion.span variants={titleChild}>Overskueligt.</motion.span>
                        </motion.h1>
                        <motion.p animate="animate" initial="initial" variants={text} className="mt-8 mb-12 text-text xl:font-medium-normal xxl:font-large-normal max-w-[550px]">
                            Med vores system kan du gøre det nemt for dig selv at administrere løn og kontrollere medarbejdere
                        </motion.p>
                        <motion.div animate="animate" initial="initial" variants={button}>
                            <Link to="/signup" className="inline-flex py-4 text-white px-7 rounded-xl bg-lightPrimary">
                                Kom nemt igang
                            </Link>
                        </motion.div>
                    </div>
                    <div className="mt-12">
                        <p className="pb-2">Gør som +1000 andre!</p>
                        <div className="flex items-center justify-start">
                            <div className="w-12 h-12 rounded-full border-[3px]  border-white border-solid bg-lightPrimaryLight" />
                            <div className="w-12 h-12 rounded-full border-[3px] -ml-3 border-white border-solid bg-lightPrimaryLight" />
                            <div className="w-12 h-12 rounded-full border-[3px] -ml-3 border-white border-solid bg-lightPrimaryLight" />
                            <div className="w-12 h-12 rounded-full border-[3px] -ml-3 border-white border-solid bg-lightPrimaryLight" />
                        </div>
                    </div>
                </div>
                <div className="relative hidden h-full lg:block">
                    <PDF />
                </div>
            </section>
        </>
    )
}

export default Hero
