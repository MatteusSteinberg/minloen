import { ClipboardDocumentIcon, FaceFrownIcon, Square3Stack3DIcon, Squares2X2Icon, TruckIcon, UsersIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { NavLink } from "react-router-dom"

type Props = {}

const Sidebar = (props: Props) => {
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className="pt-[22px]">
            <div className="flex flex-col justify-start gap-10">
                <div className="flex items-center justify-between px-[10px]">
                    <svg width="167" height="38" viewBox="0 0 167 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.3456 19C38.3456 29.4934 29.7601 38 19.1693 38C9.58797 38 1.64786 31.0378 0.221254 21.9408L4.29602 22.7999C5.99935 29.3641 12.0126 34.2148 19.1693 34.2148C27.6502 34.2148 34.5253 27.4029 34.5253 19C34.5253 10.5971 27.6502 3.78516 19.1693 3.78516C10.6884 3.78516 3.81323 10.5971 3.81323 19C3.81323 19.0949 3.81411 19.1896 3.81585 19.284L0 18.4795C0.278292 8.22675 8.75414 0 19.1693 0C29.7601 0 38.3456 8.50659 38.3456 19Z" fill="#CDE4BA" />
                        <path
                            d="M19.1072 7.05095C18.9092 7.05372 18.7138 7.09081 18.532 7.16009C18.3503 7.22937 18.1859 7.32949 18.0481 7.45474C17.9104 7.57998 17.802 7.7279 17.7291 7.89004C17.6563 8.05217 17.6205 8.22536 17.6237 8.39969V9.83339C14.7169 10.3936 12.3529 12.2494 12.3529 14.8593C12.3529 17.9471 15.4888 20.3153 19.1313 20.3153C21.3325 20.3153 22.8944 21.6322 22.8944 23.1163C22.8944 24.6005 21.3325 25.912 19.1313 25.912C16.9301 25.912 15.3682 24.6005 15.3682 23.1163C15.3984 21.3215 12.3228 21.3215 12.3529 23.1163C12.3529 25.7288 14.7139 27.5873 17.6237 28.1449V29.6051C20.639 31.5801 20.639 32.2852 20.639 29.6051V28.421C23.594 27.8741 25.973 25.7687 25.9097 23.1216C25.9097 19.5852 23.3226 17.6656 19.1313 17.6656C16.9301 17.6656 15.3682 16.3487 15.3682 14.8646C15.3682 13.4017 16.894 12.1167 19.0469 12.0822C19.1041 12.0859 19.1615 12.0868 19.2188 12.0848C21.3717 12.1246 22.8944 13.4017 22.8944 14.8646C22.8643 16.662 25.9399 16.662 25.9097 14.8646C25.9097 12.2149 23.594 10.1069 20.639 9.55992V8.39969C20.6422 8.22178 20.6048 8.04511 20.529 7.88017C20.4532 7.71524 20.3405 7.56541 20.1976 7.4396C20.0547 7.31378 19.8845 7.21454 19.6972 7.14777C19.5099 7.08101 19.3092 7.04808 19.1072 7.05095Z"
                            fill="#CDE4BA"
                        />
                        <path d="M49.6073 29.8835V6.39866H53.9526L62.1371 23.1044L70.3391 6.39866H74.6669V29.8835H70.9673V13.0567L63.4459 28.2233H60.8283L53.3069 13.0567V29.8835H49.6073Z" fill="white" />
                        <path d="M79.9894 7.71299C79.9894 6.46784 80.862 5.60316 82.1185 5.60316C83.3749 5.60316 84.2649 6.46784 84.2649 7.71299C84.2649 8.95813 83.3749 9.82282 82.1185 9.82282C80.862 9.82282 79.9894 8.95813 79.9894 7.71299ZM83.8461 29.8835H80.3908V13.2816H83.8461V29.8835Z" fill="white" />
                        <path d="M92.6065 29.8835H89.1512V13.2816H92.6239V15.3741C93.1824 14.5267 94.7704 12.9357 97.772 12.9357C102.379 12.9357 104.805 15.7718 104.805 19.8013V29.8835H101.349V20.5276C101.349 17.7779 99.8312 16.1869 97.231 16.1869C94.6832 16.1869 92.6065 17.7779 92.6065 20.5276V29.8835Z" fill="white" />
                        <path d="M127.474 26.5804V29.8835H110.302V6.39866H113.984V26.5804H127.474Z" fill="white" />
                        <path
                            d="M142.569 13.9214L145.465 10.4108L147.542 12.2439L144.802 15.5643C146.303 17.1035 147.211 19.2133 147.211 21.5825C147.211 26.4421 143.406 30.2294 138.311 30.2294C136.583 30.2294 135.012 29.797 133.669 29.0361L130.615 32.737L128.538 30.9038L131.522 27.2894C130.196 25.7676 129.411 23.7961 129.411 21.5825C129.411 16.723 133.215 12.9357 138.311 12.9357C139.881 12.9357 141.312 13.2988 142.569 13.9214ZM133.738 24.6089L140.405 16.5328C139.776 16.2907 139.061 16.1523 138.311 16.1523C135.152 16.1523 132.866 18.5215 132.866 21.5825C132.866 22.7239 133.18 23.7615 133.738 24.6089ZM142.638 18.193L135.815 26.4593C136.548 26.8052 137.386 27.0127 138.311 27.0127C141.469 27.0127 143.755 24.6435 143.755 21.5825C143.755 20.2855 143.336 19.1095 142.638 18.193Z"
                            fill="white"
                        />
                        <path d="M154.802 29.8835H151.346V13.2816H154.819V15.3741C155.378 14.5267 156.966 12.9357 159.967 12.9357C164.574 12.9357 167 15.7718 167 19.8013V29.8835H163.545V20.5276C163.545 17.7779 162.026 16.1869 159.426 16.1869C156.878 16.1869 154.802 17.7779 154.802 20.5276V29.8835Z" fill="white" />
                    </svg>
                    <button className="h-[20px] w-[20px] bg-[#6C7275] rounded-[3px] relative" onClick={() => toggleSidebar()}>
                        <div className={`w-[8px] h-[calc(100%-4px)] bg-secondarySupport absolute top-1/2 -translate-y-1/2 rounded-[2px] ${showSidebar ? "right-[3px]" : "left-[2px]"} `} />
                    </button>
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                    <NavLink to="/" className={({ isActive }) => "flex items-center justify-start w-full text-white gap-[14px] font-standard-normal py-[14px] px-[16px] rounded-lg bg-gradientmain border-[1px] border-solid border-[rgba(51,54,62,0.15)]"}>
                        <Squares2X2Icon className="w-[26px] h-[26px]" />
                        <span>Overview</span>
                    </NavLink>
                    <NavLink to="/lønsedler" className="flex items-center justify-start w-full text-white gap-[14px] font-standard-normal py-[14px] px-[16px] rounded-lg">
                        <ClipboardDocumentIcon className="w-[26px] h-[26px]" />
                        <span>Lønsedler</span>
                    </NavLink>
                    <NavLink to="/kørsel" className="flex items-center justify-start w-full text-white gap-[14px] font-standard-normal py-[14px] px-[16px] rounded-lg">
                        <TruckIcon className="w-[26px] h-[26px]" />
                        <span>Kørsel</span>
                    </NavLink>
                    <NavLink to="/fravær" className="flex items-center justify-start w-full text-white gap-[14px] font-standard-normal py-[14px] px-[16px] rounded-lg">
                        <FaceFrownIcon className="w-[26px] h-[26px]" />
                        <span>Sygedage / Fravær</span>
                    </NavLink>
                    <div className="bg-border h-[1px] w-full my-6 opacity-10" />
                    <p className="font-small-medium text-[#6C7275] mb-3">Admin navigation</p>
                    <NavLink to="/" className={({ isActive }) => "flex items-center justify-start w-full text-white gap-[14px] font-standard-normal py-[14px] px-[16px] rounded-lg bg-gradientmain border-[1px] border-solid border-[rgba(51,54,62,0.15)]"}>
                        <Square3Stack3DIcon className="w-[26px] h-[26px]" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/lønsedler" className="flex items-center justify-start w-full text-white gap-[14px] font-standard-normal py-[14px] px-[16px] rounded-lg">
                        <UsersIcon className="w-[26px] h-[26px]" />
                        <span>Medarbejdere</span>
                    </NavLink>
                </div>
            </div>
            <div className="flex flex-col justify-start gap-2"></div>
        </div>
    )
}

export default Sidebar
