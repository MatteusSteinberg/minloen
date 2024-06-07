import { DocumentIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Button from "../../elements/Button"

type Props = {}

const CurrentPaycheck = (props: Props) => {
    const [showPaycheck, setShowPaycheck] = useState(false)

    return (
        <div className="flex lg:flex-row flex-col items-start justify-between gap-4 lg:h-[600px] xxl:h-[1140px]">
            <div className="relative flex items-center justify-center h-[800px] lg:h-full w-full bg-white lg:w-2/4 xxl:w-3/5 rounded-2xl">
                {!showPaycheck && (
                    <>
                        <div className="absolute top-0 left-0 w-full h-full blur-lg -z-10" />
                        <Button background="primaryLight" color="white" onClick={() => setShowPaycheck(!showPaycheck)}>
                            Se lønseddel
                        </Button>
                    </>
                )}
            </div>
            <div className="flex flex-col items-start justify-between w-full p-5 bg-white border border-solid lg:w-2/4 xxl:w-2/5 dark:bg-darkPrimarySupport border-lightBorder dark:border-darkBorder rounded-2xl">
                <div className="w-full">
                    <div className="flex items-center justify-start w-full gap-4 mb-8">
                        <div className="bg-lightPrimary rounded-xl dark:bg-darkSecondarySupport h-[60px] w-[60px] flex items-center justify-center">
                            <DocumentIcon className="w-[30px] h-[30px] text-white" />
                        </div>
                        <span className="-mt-1 text-text dark:text-white font-h4">Dit overblik</span>
                    </div>
                    <div className="flex flex-col items-start w-full gap-2">
                        <div className="flex flex-col justify-between w-full p-4 border border-solid sm:flex-row sm:items-center border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-small-normal sm:font-standard-normal">Indkomst før skat</p>
                            <p className="-mt-1 text-text dark:text-white font-standard-normal sm:font-h4">21.057,00 DKK</p>
                        </div>
                        <div className="flex flex-col justify-between w-full p-4 border border-solid sm:flex-row sm:items-center border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-small-normal sm:font-standard-normal">AM-Bidrag</p>
                            <p className="-mt-1 text-text dark:text-white font-standard-normal sm:font-h4">2.017 DKK</p>
                        </div>
                        <div className="flex flex-col justify-between w-full p-4 border border-solid sm:flex-row sm:items-center border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-small-normal sm:font-standard-normal">Pension (Egen betaling)</p>
                            <p className="-mt-1 text-text dark:text-white font-standard-normal sm:font-h4">1.741 DKK</p>
                        </div>
                        <div className="flex flex-col justify-between w-full p-4 border border-solid sm:flex-row sm:items-center border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-small-normal sm:font-standard-normal">Frokostordning</p>
                            <p className="-mt-1 text-text dark:text-white font-standard-normal sm:font-h4">381 DKK</p>
                        </div>
                        <div className="flex flex-col justify-between w-full p-4 border border-solid sm:flex-row sm:items-center border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-small-normal sm:font-standard-normal">Mobiltelefon</p>
                            <p className="-mt-1 text-text dark:text-white font-standard-normal sm:font-h4">299 DKK</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10">
                    <div className="flex flex-col justify-between w-full p-4 border border-solid sm:flex-row sm:items-center border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                        <p className="text-text dark:text-white font-small-normal sm:font-standard-normal">Til udbetaling</p>
                        <p className="-mt-1 text-text dark:text-white font-standard-normal sm:font-h4">1.741 DKK</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentPaycheck
