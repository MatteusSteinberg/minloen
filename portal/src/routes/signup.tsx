import loginSvg from "../assets/images/Login.svg"
import Form from "../components/layouts/register/Form"

const signup = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full sm:px-6 lg:justify-between min-h-dvh lg:flex-row lg:px-0">
            <div className="relative w-full overflow-hidden h-full min-h-dvh py-[108px] px-[76px] hidden lg:block">
                <h1 className="text-left text-white font-default text-[48px] font-medium">Se dine lønsedler, eller registrer dine sygedage</h1>
                <div className="hidden px-12 lg:block">
                    <img src={loginSvg} alt="login" className="w-[766px] h-auto absolute left-1/2 -translate-x-1/2 bottom-0 px-12 pointer-events-none" />
                </div>
            </div>
            <Form />
        </div>
    )
}

export default signup
