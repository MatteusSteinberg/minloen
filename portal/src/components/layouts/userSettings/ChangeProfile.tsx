import { MapPinIcon } from "@heroicons/react/24/outline"
import TranImage from "../../../assets/images/jonas1.png"
import Input from "../../elements/Input"

type Props = {}

const ChangeProfile = (props: Props) => {
    return (
        <>
            <div className="flex flex-col items-start justify-start gap-[42px] w-full">
                <p className="font-h4">Ændre profil</p>
                <div className="flex flex-col items-start gap-4">
                    <p>Profil billede</p>
                    <div className="flex items-center gap-6">
                        <img src={TranImage} alt="ProfileImage" className="rounded-full w-28 h-28" />
                        <div className="flex flex-col justify-start gap-[8px]">
                            <button className="border-solid border-2 border-[rgb(52,56,57)] bg-transparent text-white font-standard-medium py-3 px-5 rounded-[14px] flex justify-center hover:bg-[rgb(52,56,57)] transition-colors duration-150">Upload billede</button>
                            <p className="font-normal text-white font-default text-[12px] opacity-30">
                                mindst 800x800 px er anbefalet
                                <br />
                                JPG / PNG er tilladte filtyper
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Input label="Lokation" placeholder="Adresse" name="adress" icon={<MapPinIcon />} />
                </div>
                <div className="flex w-full gap-4">
                    <button className="w-full py-5 bg-darkPrimaryLight text-text rounded-2xl">Gem ændringer</button>
                    <button className="w-full py-5 text-white bg-gradientmain rounded-2xl">Anuller</button>
                </div>
            </div>
        </>
    )
}

export default ChangeProfile
