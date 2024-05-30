import { MapPinIcon } from "@heroicons/react/24/outline"
import Input from "../../elements/Input"
import { useRef } from 'react'
import { useAPI } from '../../../hooks/use-api'
import { compressImage } from '../../../lib/utils/imageCompressor'
import { profileImage } from '../../../lib/utils/profileImage'
import { useAuth } from '../../../hooks/use-auth'

type Props = {}

const ChangeProfile = (props: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { create, error } = useAPI({ url: "/user/profile/image", opts: { autoGet: false }})
    const { user } = useAuth()

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        const form = new FormData()
        if (file) {
            const compressedFile = await compressImage({ file, quality: 0.8, maxHeight: 200, maxWidth: 200 })
            if (compressedFile.size > 300 * 1000) {
                console.log("File is too big") // set toast here
                return
            }

            form.append("image", compressedFile)

            await create(form)

            if (error) {
                console.log(error)
            }

        }
    }
    return (
        <>
            <div className="flex flex-col items-start justify-start gap-[42px] w-full">
                <p className="font-h4">Ændre profil</p>
                <div className="flex flex-col items-start gap-4">
                    <p>Profil billede</p>
                    <div className="flex items-center gap-6">
                        <img src={profileImage({userId: user?._id})} alt="ProfileImage" className="rounded-full w-28 h-28" />
                        <div className="flex flex-col justify-start gap-[8px]">
                            <button onClick={handleButtonClick} className="border-solid border-2 border-[rgb(52,56,57)] bg-transparent text-white font-standard-medium py-3 px-5 rounded-[14px] flex justify-center hover:bg-[rgb(52,56,57)] transition-colors duration-150">Upload billede</button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
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
