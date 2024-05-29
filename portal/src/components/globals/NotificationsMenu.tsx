import { DocumentIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"

type Props = {}

const NotificationsMenu = (props: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [toggleMenu, node, setToggleMenu] = useOutsideClick(false, buttonRef)

    return (
        <>
            <button ref={buttonRef} className="relative w-10 h-10 rounded-full group" onClick={() => setToggleMenu(!toggleMenu)}>
                <svg className="inline-block w-6 h-6 fill-[#6c7275] transition-colors hover:fill-primaryLight" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11 3a1 1 0 0 1 .117 1.993L11 5l-3.664.001-.752.009-.299.008-.254.012-.31.025-.167.022-.141.027-.121.032-.106.038-.096.044a2 2 0 0 0-.874.874l-.048.106-.041.119-.034.139-.028.166-.022.2-.024.38-.01.317-.01.818v8.327l.01.818.01.317.015.265.009.115.022.2.028.166.034.139.041.119.048.106a2 2 0 0 0 .874.874l.106.048.119.041.139.034.166.028.2.022.38.024.317.01.818.01h8.327l.818-.01.317-.01.265-.015.115-.009.2-.022.166-.028.139-.034.119-.041.106-.048a2 2 0 0 0 .874-.874l.044-.096.02-.051.035-.112.015-.063.027-.141.022-.167.025-.31.012-.254.014-.647L19 16.2V13a1 1 0 0 1 1.993-.117L21 13l-.003 3.985-.006.443-.01.387-.016.338-.022.296-.03.26c-.046.327-.114.577-.218.825l-.084.186-.047.095a4 4 0 0 1-1.748 1.748l-.189.091c-.279.126-.551.207-.918.258l-.26.03-.296.022-.338.016-.387.01-.443.006L15.2 22l-8.185-.003-.443-.006-.387-.01-.338-.016-.296-.022-.26-.03c-.327-.046-.577-.114-.825-.218l-.186-.084-.095-.047a4 4 0 0 1-1.748-1.748l-.091-.189c-.126-.279-.207-.551-.258-.918l-.03-.26-.022-.296-.016-.338-.01-.387-.006-.443L2 16.2l.003-8.185.006-.443.01-.387.016-.338.022-.296.03-.26c.046-.327.114-.577.218-.825l.084-.186.047-.095a4 4 0 0 1 1.748-1.748l.189-.091a3.18 3.18 0 0 1 .918-.258l.26-.03.296-.022.338-.016.387-.01.443-.006L7.8 3H11zm9.828.172a4 4 0 0 1-5.657 5.657 4 4 0 0 1 5.657-5.657zm-4.243 1.414a2 2 0 0 0 2.828 2.828 2 2 0 0 0 .117-2.701l-.117-.127-.127-.117a2 2 0 0 0-2.701.117z"></path>
                </svg>
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error"></div>
            </button>
            <div ref={node} className={`absolute transition-all duration-150 md:right-0 transform ${toggleMenu ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
                <div className="absolute top-full -right-[158px] md:right-16 w-[445px] mt-10 p-4 bg-primarySupport border border-solid border-[rgba(51,54,62,0.50)] rounded-2xl shadow-[0px_48px_64px_-16px_rgba(0,0,0,0.25)]">
                    <div className="flex items-center justify-between p-4 mb-3 bg-secondarySupport rounded-xl">
                        <p className="font-default text-[24px] font-semibold leading-8 text-white">Notifikationer</p>
                        <button>
                            <svg className="inline-block w-6 h-6 transition-all fill-white opacity-30 hover:fill-primaryLight hover:opacity-100" width="24" height="24" viewBox="0 0 24 24" role="none">
                                <path
                                    d="M12.5 2a2.49 2.49 0 0 1 1.766.73l.052.053a2.49 2.49 0 0 1 .68 1.607l.001.021L15 4.5v.014c0 .041.025.077.062.093a.1.1 0 0 0 .11-.022l.01-.01.063-.061.015-.014a2.49 2.49 0 0 1 1.617-.656l.074-.001a2.49 2.49 0 0 1 1.765.732l.707.707a2.49 2.49 0 0 1 .732 1.765l-.001.074a2.49 2.49 0 0 1-.656 1.618l-.014.015-.061.063-.01.01c-.029.029-.037.072-.021.11s.052.062.093.062h.014l.088.002h.021a2.49 2.49 0 0 1 1.608.68l.053.052A2.49 2.49 0 0 1 22 11.5v1a2.49 2.49 0 0 1-.73 1.766l-.053.052a2.49 2.49 0 0 1-1.608.68l-.021.001L19.5 15h-.014a.1.1 0 0 0-.093.062c-.016.037-.007.081.021.11l.01.01.061.063.014.015a2.49 2.49 0 0 1 .656 1.617l.001.074a2.49 2.49 0 0 1-.732 1.765l-.707.707a2.49 2.49 0 0 1-1.765.732c-.025 0-.05 0-.074-.001a2.49 2.49 0 0 1-1.617-.656l-.015-.014-.063-.061-.01-.01c-.029-.029-.072-.037-.11-.021a.1.1 0 0 0-.062.093v.014l-.002.088-.001.021a2.49 2.49 0 0 1-.68 1.608l-.052.053A2.49 2.49 0 0 1 12.5 22h-1a2.49 2.49 0 0 1-1.766-.73l-.052-.053a2.49 2.49 0 0 1-.68-1.608v-.021L9 19.544h0v-.058c0-.041-.025-.077-.062-.093s-.081-.007-.11.021l-.01.01-.063.061-.015.014a2.49 2.49 0 0 1-1.618.656l-.074.001a2.49 2.49 0 0 1-1.765-.732l-.707-.707a2.49 2.49 0 0 1-.732-1.765l.001-.074a2.49 2.49 0 0 1 .656-1.617l.014-.015.061-.063.01-.01a.1.1 0 0 0 .022-.11c-.016-.038-.052-.062-.093-.062H4.5a2.57 2.57 0 0 1-.088-.002l-.021-.001a2.49 2.49 0 0 1-1.607-.68l-.053-.052A2.49 2.49 0 0 1 2 12.5v-1a2.49 2.49 0 0 1 .73-1.766l.053-.052a2.49 2.49 0 0 1 1.607-.68h.021L4.456 9h0 .058c.041 0 .077-.025.093-.062s.007-.081-.022-.11l-.01-.01-.061-.063-.014-.015a2.49 2.49 0 0 1-.656-1.618l-.001-.074a2.49 2.49 0 0 1 .732-1.765l.707-.707a2.49 2.49 0 0 1 1.765-.732l.074.001a2.49 2.49 0 0 1 1.618.656l.015.014.063.061.01.01c.029.029.072.037.11.022S9 4.555 9 4.514V4.5l.002-.088v-.021a2.49 2.49 0 0 1 .68-1.607l.052-.053A2.49 2.49 0 0 1 11.5 2h1zm0 2h-1a.5.5 0 0 0-.5.5v.014A2.1 2.1 0 0 1 7.414 6l-.01-.01a.5.5 0 0 0-.707 0l-.707.707a.5.5 0 0 0 0 .707l.01.01A2.1 2.1 0 0 1 4.514 11H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.014A2.1 2.1 0 0 1 6 16.586l-.01.01a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.01-.01A2.1 2.1 0 0 1 11 19.486v.014a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-.014A2.1 2.1 0 0 1 16.586 18l.01.01a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.01-.01A2.1 2.1 0 0 1 19.486 13h.014a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-.014A2.1 2.1 0 0 1 18 7.414l.01-.01a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.01.01A2.1 2.1 0 0 1 13 4.514V4.5a.5.5 0 0 0-.5-.5zM12 8a4 4 0 1 1 0 8 4 4 0 1 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"
                                    role="none"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="max-h-[340px] md:max-h-[510px] -mx-6 px-6 space-y-6 md:space-y-3 overflow-y-auto scroll-smooth no-scrollbar ">
                        <div className="flex items-center p-0 transition-colors md:p-2 rounded-xl hover:bg-secondarySupport">
                            <div className="relative flex items-center justify-center w-12 h-12 shrink-0 md:w-16 md:h-16">
                                <DocumentIcon className="w-8 h-8 text-primaryLight" />
                            </div>
                            <div className="w-[calc(100%-60px)] px-3 md:px-5">
                                <div className="mb-0 text-white truncate font-medium-normal md:mb-1">Ny lønseddel tilgængelig</div>
                                <div className="text-white opacity-25 font-light text-[14px] font-default">Din lønseddel fra Maj er nu ankommet!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationsMenu
