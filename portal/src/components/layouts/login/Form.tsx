import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import Input from "../../elements/Input"

type Props = {}

const Form = (props: Props) => {
    return (
        <div className="w-full min-h-dvh sm:min-h-[calc(100vh-48px)] inline-flex items-center justify-center flex-col sm:rounded-3xl lg:mr-6 bg-secondarySupport p-4 sm:p-12 relative">
            <div className="max-w-[500px] w-full h-full flex flex-col gap-8 relative mb-44">
                <div className="mx-auto">
                    <svg width="269" height="62" viewBox="0 0 269 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M61.7663 31C61.7663 48.1208 47.9369 62 30.8775 62C15.4441 62 2.65434 50.6406 0.356392 35.7982L6.91993 37.1998C9.66363 47.9098 19.3496 55.8242 30.8775 55.8242C44.5383 55.8242 55.6126 44.71 55.6126 31C55.6126 17.29 44.5383 6.17578 30.8775 6.17578C17.2166 6.17578 6.14227 17.29 6.14227 31C6.14227 31.1548 6.14368 31.3093 6.14649 31.4634L0 30.1508C0.448266 13.4226 14.101 0 30.8775 0C47.9369 0 61.7663 13.8792 61.7663 31Z" fill="#CDE4BA" />
                        <path
                            d="M30.7774 11.5042C30.4585 11.5087 30.1437 11.5692 29.851 11.6822C29.5583 11.7953 29.2934 11.9586 29.0715 12.163C28.8496 12.3673 28.675 12.6087 28.5577 12.8732C28.4404 13.1378 28.3827 13.4203 28.3878 13.7048V16.0439C23.7057 16.958 19.8978 19.9859 19.8978 24.2441C19.8978 29.282 24.9491 33.146 30.8163 33.146C34.3619 33.146 36.8778 35.2946 36.8778 37.7161C36.8778 40.1376 34.3619 42.2775 30.8163 42.2775C27.2707 42.2775 24.7548 40.1376 24.7548 37.7161C24.8034 34.7878 19.8492 34.7878 19.8978 37.7161C19.8978 41.9786 23.7008 45.0109 28.3878 45.9206V48.3031C33.2448 51.5254 33.2448 52.6758 33.2448 48.3031V46.3711C38.0047 45.4787 41.8368 42.0436 41.7348 37.7248C41.7348 31.9548 37.5675 28.8229 30.8163 28.8229C27.2707 28.8229 24.7548 26.6743 24.7548 24.2528C24.7548 21.8659 27.2124 19.7693 30.6803 19.713C30.7724 19.7191 30.8649 19.7206 30.9572 19.7173C34.425 19.7823 36.8778 21.8659 36.8778 24.2528C36.8293 27.1854 41.7834 27.1854 41.7348 24.2528C41.7348 19.9296 38.0047 16.4901 33.2448 15.5978V13.7048C33.2501 13.4145 33.1898 13.1262 33.0677 12.8571C32.9455 12.588 32.764 12.3436 32.5338 12.1383C32.3037 11.933 32.0296 11.7711 31.7278 11.6622C31.4261 11.5532 31.1029 11.4995 30.7774 11.5042Z"
                            fill="#CDE4BA"
                        />
                        <path d="M79.9064 48.7573V10.4399H86.9057L100.089 37.6966L113.301 10.4399H120.272V48.7573H114.313V21.3031L102.197 46.0485H97.9809L85.8656 21.3031V48.7573H79.9064Z" fill="white" />
                        <path d="M128.845 12.5843C128.845 10.5528 130.251 9.14199 132.275 9.14199C134.299 9.14199 135.732 10.5528 135.732 12.5843C135.732 14.6159 134.299 16.0267 132.275 16.0267C130.251 16.0267 128.845 14.6159 128.845 12.5843ZM135.058 48.7573H129.492V21.6699H135.058V48.7573Z" fill="white" />
                        <path d="M149.169 48.7573H143.603V21.6699H149.197V25.084C150.096 23.7015 152.654 21.1056 157.489 21.1056C164.91 21.1056 168.817 25.733 168.817 32.3073V48.7573H163.251V33.4924C163.251 29.0061 160.806 26.4102 156.618 26.4102C152.514 26.4102 149.169 29.0061 149.169 33.4924V48.7573Z" fill="white" />
                        <path d="M205.332 43.368V48.7573H177.672V10.4399H183.603V43.368H205.332Z" fill="white" />
                        <path
                            d="M229.646 22.7139L234.313 16.986L237.658 19.9769L233.245 25.3944C235.662 27.9056 237.124 31.348 237.124 35.2136C237.124 43.1423 230.996 49.3216 222.788 49.3216C220.005 49.3216 217.475 48.6162 215.311 47.3747L210.391 53.4129L207.046 50.422L211.853 44.5249C209.717 42.0419 208.452 38.8252 208.452 35.2136C208.452 27.2849 214.58 21.1056 222.788 21.1056C225.318 21.1056 227.623 21.6981 229.646 22.7139ZM215.423 40.1514L226.161 26.9745C225.149 26.5795 223.996 26.3538 222.788 26.3538C217.7 26.3538 214.018 30.2194 214.018 35.2136C214.018 37.0758 214.523 38.7688 215.423 40.1514ZM229.759 29.6833L218.768 43.1705C219.949 43.7348 221.298 44.0734 222.788 44.0734C227.876 44.0734 231.558 40.2078 231.558 35.2136C231.558 33.0974 230.883 31.1787 229.759 29.6833Z"
                            fill="white"
                        />
                        <path d="M249.351 48.7573H243.786V21.6699H249.379V25.084C250.279 23.7015 252.837 21.1056 257.672 21.1056C265.093 21.1056 269 25.733 269 32.3073V48.7573H263.434V33.4924C263.434 29.0061 260.989 26.4102 256.8 26.4102C252.696 26.4102 249.351 29.0061 249.351 33.4924V48.7573Z" fill="white" />
                    </svg>
                </div>
                <form>
                    <div className="mb-2">
                        <Input name="e-mail" type="email" label="E-mail" icon={<UserIcon />} placeholder="AnneAnnesen@outlook.dk" />
                    </div>
                    <div className="mb-2">
                        <Input name="password" type="password" label="Password" icon={<LockClosedIcon />} placeholder="1234..." />
                    </div>
                    <div className="flex justify-center">
                        {/* <Button background="primaryLight" color="text" variant="filled">
                            Log ind
                        </Button> */}
                    </div>
                </form>
            </div>
            <div className="absolute bottom-3 sm:bottom-6 max-w-[calc(100%-16px)] sm:max-w-[calc(100%-48px)] w-full">
                <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row lg:flex-col xl:flex-row xl:gap-7">
                    <div className="w-full bg-primarySupport rounded-[22px] p-6 relative">
                        <p className="font-small-medium text-primaryLight">Har du ikke et login?</p>
                        <p className="text-white pt-[10px] font-medium-medium max-w-[350px]">Kontakt din administrator for at blive inviteret</p>
                    </div>
                    <Link to="/register" className="w-full bg-primarySupport rounded-[22px] p-6 relative">
                        <p className="font-small-medium text-primaryLight">Er du en virksomhed?</p>
                        <p className="text-white pt-[10px] font-medium-medium max-w-[300px]">Klik her for at registrere dig som Virksomhed</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Form