import { motion } from "framer-motion"
import Button from "../../elements/Button"

type Props = {}

const PricingHero = (props: Props) => {
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

    const pricingTables = {
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
            <section className="relative w-full gap-8 py-[calc(88px+64px)] min-h-dvh lg:min-h-[calc(100vh-88px-64px)] h-full flex flex-col">
                <motion.h1 animate="animate" initial="initial" variants={titleChild} className="text-center font-default justify-center font-semibold text-[42px] xs:text-[52px] sm:text-[65px] xl:text-[75px] xxl:text-[95px] text-text leading-1 flex ">
                    Få det til en fair pris
                </motion.h1>
                <motion.p animate="animate" initial="initial" variants={text} className="text-center mb-12 flex mx-auto text-text xl:font-medium-normal xxl:font-large-normal max-w-[550px]">
                    Med vores system kan du gøre det nemt for dig selv at administrere løn og kontrollere medarbejdere
                </motion.p>
                <motion.div animate="animate" initial="initial" variants={pricingTables} className="flex px-12 py-6 -mx-8 overflow-auto lg:overflow-visible grow lg:justify-center lg:scroll-smooth no-scrollbar lg:py-0 lg:mx-0 lg:before:shrink-0 lg:before:w-8 lg:after:shrink-0 lg:after:w-8">
                    <div className="flex basis-1/3 border-r-2 border-lightBorder border-solid p-8 bg-white first:rounded-l-3xl last:rounded-r-3xl last:border-none 2xl:px-6 lg:shrink-0 lg:basis-[18.5rem] dark:border-n-6 false">
                        <div className="relative flex flex-col grow z-2">
                            <div className="flex items-center justify-between mb-1">
                                <div className="font-h4">Startup</div>
                            </div>
                            <div className="mb-6 font-standard-normal">De basiske funktioner</div>
                            <div className="mb-2">
                                <span className="mr-2 font-h3">0 DKK</span>
                                <span className="font-h4 text-n-4/50 false">/mo</span>
                            </div>
                            <div className="base1 text-text">Gratis forevigt</div>
                            <div className="pt-6 mt-6 mb-6 space-y-4 border-t border-solid grow border-lightBorder false">
                                <div className="flex font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightPrimary false" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    3 Medarbejdere
                                </div>
                                <div className="flex font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightPrimary false" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Lønsedler
                                </div>
                            </div>
                            <Button background="secondarySupport" color="white">
                                Vælg plan
                            </Button>
                        </div>
                    </div>
                    <div className="flex basis-1/3 p-8 bg-white first:rounded-l-3xl last:rounded-r-3xl last:border-none 2xl:px-6 lg:shrink-0 lg:basis-[18.5rem] dark:border-n-6 false">
                        <div className="relative flex flex-col grow z-2">
                            <div className="flex items-center justify-between mb-1">
                                <div className="font-h4 text-lightPrimary">Den mellemstore</div>
                            </div>
                            <div className="mb-6 font-standard-normal">Til den lidt større virksomhed</div>
                            <div className="mb-2">
                                <span className="mr-2 font-h3">199 DKK</span>
                                <span className="font-h4 text-n-4/50 false">/mo</span>
                            </div>
                            <div className="base1 text-text">Per måned</div>
                            <div className="pt-6 mt-6 mb-6 space-y-4 border-t border-solid grow border-lightBorder false">
                                <div className="flex font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightPrimary false" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Uendelig medarbejdere
                                </div>
                                <div className="flex font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightPrimary false" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Lønsedler + Fravær
                                </div>
                                <div className="flex font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightPrimary false" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Detaljeret oversigt
                                </div>
                            </div>
                            <Button background="secondarySupport" color="white">
                                Vælg plan
                            </Button>
                        </div>
                    </div>
                    <div className="flex basis-1/3 border-r-2 border-n-3 p-8 bg-white first:rounded-l-3xl last:rounded-r-3xl last:border-none 2xl:px-6 lg:shrink-0 lg:basis-[18.5rem] dark:border-n-6 relative text-n-1 before:absolute before:-top-4 before:left-0 before:right-0 before:-bottom-4 before:bg-lightPrimary before:rounded-3xl dark:text-n-7 dark:before:bg-n-2">
                        <div className="relative flex flex-col grow z-2">
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-white font-h4">Den helt store</div>
                            </div>
                            <div className="mb-6 text-white opacity-50 font-standard-normal">Til den helt store fisk</div>
                            <div className="mb-2">
                                <span className="mr-2 text-white font-h3">1299 DKK</span>
                                <span className="text-white font-h4">/mo</span>
                            </div>
                            <div className="text-white">Per måned</div>
                            <div className="pt-6 mt-6 mb-6 space-y-4 border-t border-solid grow border-darkBorder false">
                                <div className="flex text-white font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightSecondary" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Alt fra den gamle plan
                                </div>
                                <div className="flex text-white font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightSecondary" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Kørsel + Fravær + Lønsedler
                                </div>
                                <div className="flex text-white font-small-normal">
                                    <svg className="inline-block w-6 h-6 mr-3 fill-lightSecondary" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12.008 1.008c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11zm3.793 7.293l-5.293 5.293-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z"></path>
                                    </svg>
                                    Prioritet support
                                </div>
                            </div>
                            <Button background="primary" color="white">
                                Vælg plan
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default PricingHero
