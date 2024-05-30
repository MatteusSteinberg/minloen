import { DocumentIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Button from "../../elements/Button"

type Props = {}

const CurrentPaycheck = (props: Props) => {
    const [showPaycheck, setShowPaycheck] = useState(false)

    return (
        <div className="flex items-start justify-between gap-4 h-[1140px]">
            <div className="relative flex items-center justify-center w-3/5 h-full bg-white rounded-2xl">
                {!showPaycheck && (
                    <>
                        <div className="absolute top-0 left-0 w-full h-full blur-lg -z-10" />
                        <Button background="primaryLight" color="white" onClick={() => setShowPaycheck(!showPaycheck)}>
                            Se lønseddel
                        </Button>
                    </>
                )}
            </div>
            <div className="flex flex-col items-start justify-between w-2/5 h-full p-5 bg-white border border-solid dark:bg-darkPrimarySupport border-lightBorder dark:border-darkBorder rounded-2xl">
                <div className="w-full">
                    <div className="flex items-center justify-start w-full gap-4 mb-8">
                        <div className="bg-lightPrimary rounded-xl dark:bg-darkSecondarySupport h-[60px] w-[60px] flex items-center justify-center">
                            <DocumentIcon className="w-[30px] h-[30px] text-white" />
                        </div>
                        <span className="-mt-1 text-text dark:text-white font-h4">Dit overblik</span>
                    </div>
                    <div className="flex flex-col items-start w-full gap-2">
                        <div className="flex items-center justify-between w-full p-4 border border-solid border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-standard-normal">Indkomst før skat</p>
                            <p className="-mt-1 text-text dark:text-white font-h4">21.057,00 DKK</p>
                        </div>
                        <div className="flex items-center justify-between w-full p-4 border border-solid border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-standard-normal">AM-Bidrag</p>
                            <p className="-mt-1 text-text dark:text-white font-h4">2.017 DKK</p>
                        </div>
                        <div className="flex items-center justify-between w-full p-4 border border-solid border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-standard-normal">Pension (Egen betaling)</p>
                            <p className="-mt-1 text-text dark:text-white font-h4">1.741 DKK</p>
                        </div>
                        <div className="flex items-center justify-between w-full p-4 border border-solid border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-standard-normal">Frokostordning</p>
                            <p className="-mt-1 text-text dark:text-white font-h4">381 DKK</p>
                        </div>
                        <div className="flex items-center justify-between w-full p-4 border border-solid border-lightBorder dark:border-darkBorder dark:bg-gradientmain rounded-2xl">
                            <p className="text-text dark:text-white font-standard-normal">Mobiltelefon</p>
                            <p className="-mt-1 text-text dark:text-white font-h4">299 DKK</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10">
                    <p className="mb-2 text-text dark:text-white font-large-medium ">Til udbetaling</p>
                    <div className="w-full py-4 text-center text-white bg-lightPrimary dark:bg-gradientmain rounded-2xl font-h3">
                        <p className="-mt-1">13.912,00 DKK</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentPaycheck
