import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Hamburger from "../../elements/Hamburger"

type Props = {}

const Navigation = (props: Props) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuActive, setMenuActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled)
      }
    }

    document.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <>
      <header className={`fixed top-0 left-0 z-50 flex items-center justify-between w-full px-8 lg:px-20 py-5 transition-colors duration-150 ${scrolled ? "bg-white border-b border-solid border-lightBorder" : "bg-transparent border-none"} ${menuActive ? "bg-white" : ""}`}>
        <div className="flex items-center gap-8 lg:gap-16">
          <svg width="156" height="36" viewBox="0 0 156 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.6476 18C35.6476 27.9411 27.6662 36 17.8205 36C8.91336 36 1.53192 29.4042 0.205687 20.786L3.99375 21.5999C5.57724 27.8186 11.1674 32.4141 17.8205 32.4141C25.7047 32.4141 32.0961 25.9607 32.0961 18C32.0961 10.0393 25.7047 3.58594 17.8205 3.58594C9.93634 3.58594 3.54493 10.0393 3.54493 18C3.54493 18.0899 3.54575 18.1796 3.54737 18.2691L0 17.5069C0.258711 7.79377 8.1382 0 17.8205 0C27.6662 0 35.6476 8.05887 35.6476 18Z" fill="#005445" />
            <path
              d="M17.7628 6.67985C17.5788 6.68247 17.3971 6.7176 17.2281 6.78324C17.0592 6.84888 16.9063 6.94373 16.7783 7.06238C16.6502 7.18104 16.5494 7.32117 16.4817 7.47477C16.414 7.62838 16.3807 7.79244 16.3837 7.9576V9.31584C13.6814 9.84656 11.4838 11.6047 11.4838 14.0772C11.4838 17.0025 14.399 19.2461 17.7852 19.2461C19.8315 19.2461 21.2836 20.4936 21.2836 21.8997C21.2836 23.3057 19.8315 24.5482 17.7852 24.5482C15.7389 24.5482 14.2869 23.3057 14.2869 21.8997C14.3149 20.1994 11.4557 20.1994 11.4838 21.8997C11.4838 24.3747 13.6786 26.1354 16.3837 26.6636V28.047C19.1868 29.918 19.1868 30.5859 19.1868 28.047V26.9252C21.9339 26.407 24.1456 24.4124 24.0867 21.9047C24.0867 18.5544 21.6816 16.7359 17.7852 16.7359C15.7389 16.7359 14.2869 15.4883 14.2869 14.0823C14.2869 12.6963 15.7053 11.479 17.7068 11.4463C17.7599 11.4498 17.8133 11.4507 17.8665 11.4488C19.868 11.4865 21.2836 12.6963 21.2836 14.0823C21.2555 15.7851 24.1148 15.7851 24.0867 14.0823C24.0867 11.572 21.9339 9.57491 19.1868 9.05677V7.9576C19.1899 7.78906 19.1551 7.62168 19.0846 7.46543C19.0141 7.30918 18.9093 7.16723 18.7765 7.04804C18.6437 6.92884 18.4855 6.83483 18.3113 6.77158C18.1372 6.70832 17.9507 6.67713 17.7628 6.67985Z"
              fill="#005445"
            />
            <path d="M46.117 28.3107V6.06189H50.1565L57.7652 21.8883L65.3901 6.06189H69.4134V28.3107H65.9741V12.3695L58.9819 26.7379H56.5484L49.5563 12.3695V28.3107H46.117Z" fill="#005445" />
            <path d="M74.3614 7.30704C74.3614 6.12743 75.1726 5.30825 76.3407 5.30825C77.5087 5.30825 78.3361 6.12743 78.3361 7.30704C78.3361 8.48665 77.5087 9.30583 76.3407 9.30583C75.1726 9.30583 74.3614 8.48665 74.3614 7.30704ZM77.9468 28.3107H74.7346V12.5825H77.9468V28.3107Z" fill="#005445" />
            <path d="M86.0908 28.3107H82.8786V12.5825H86.107V14.5649C86.6261 13.7621 88.1024 12.2549 90.8928 12.2549C95.1757 12.2549 97.4307 14.9417 97.4307 18.7591V28.3107H94.2186V19.4472C94.2186 16.8422 92.8071 15.335 90.3899 15.335C88.0213 15.335 86.0908 16.8422 86.0908 19.4472V28.3107Z" fill="#005445" />
            <path d="M118.505 25.1814V28.3107H102.541V6.06189H105.964V25.1814H118.505Z" fill="#005445" />
            <path
              d="M132.538 13.1887L135.231 9.86286L137.161 11.5995L134.614 14.7451C136.009 16.2033 136.853 18.2021 136.853 20.4466C136.853 25.0504 133.316 28.6383 128.579 28.6383C126.973 28.6383 125.513 28.2288 124.264 27.5079L121.425 31.014L119.494 29.2773L122.268 25.8532C121.035 24.4114 120.305 22.5437 120.305 20.4466C120.305 15.8428 123.842 12.2549 128.579 12.2549C130.039 12.2549 131.37 12.5989 132.538 13.1887ZM124.329 23.3137L130.526 15.6626C129.942 15.4333 129.277 15.3022 128.579 15.3022C125.643 15.3022 123.518 17.5467 123.518 20.4466C123.518 21.5279 123.81 22.5109 124.329 23.3137ZM132.602 17.2354L126.259 25.0667C126.941 25.3944 127.719 25.591 128.579 25.591C131.516 25.591 133.641 23.3465 133.641 20.4466C133.641 19.2178 133.251 18.1038 132.602 17.2354Z"
              fill="#005445"
            />
            <path d="M143.91 28.3107H140.698V12.5825H143.926V14.5649C144.445 13.7621 145.922 12.2549 148.712 12.2549C152.995 12.2549 155.25 14.9417 155.25 18.7591V28.3107H152.038V19.4472C152.038 16.8422 150.626 15.335 148.209 15.335C145.841 15.335 143.91 16.8422 143.91 19.4472V28.3107Z" fill="#005445" />
          </svg>
          <nav className="items-center hidden gap-8 md:flex">
            <Link to="/" className="text-text font-medium-normal">
              Hjem
            </Link>
            <Link to="/pricing" className="text-text font-medium-normal">
              Priser
            </Link>
          </nav>
        </div>
        <div className="z-10 flex items-center gap-4">
          <Link to="/login" className="hidden text-text font-medium-normal sm:flex">
            Log ind
          </Link>
          <Link to="/signup" className="hidden py-4 text-white px-7 rounded-xl bg-lightPrimary sm:flex">
            <span className="-mt-1">Kom igang</span>
          </Link>
          <Hamburger active={menuActive} setActive={setMenuActive} color="lightPrimary" />
        </div>
      </header>
      <aside className={`fixed top-0 left-0 z-10 w-full bg-white transition-all duration-300 ${menuActive ? "translate-y-0" : "-translate-y-full"}`}>
        <nav className="flex flex-col items-start pt-[76px] w-full">
          <Link to="/" className="w-full px-8 py-6 border-t border-solid text-text font-medium-normal border-lightBorder">
            Hjem
          </Link>
          <Link to="/pricing" className="w-full px-8 py-6 border-t border-solid text-text font-medium-normal border-lightBorder">
            Priser
          </Link>
          <Link to="/login" className="block w-full px-8 py-6 border-t border-solid text-text font-medium-normal border-lightBorder sm:hidden">
            Log ind
          </Link>
          <Link to="/signup" className="block w-full px-8 py-6 border-t border-solid text-text font-medium-normal border-lightBorder sm:hidden">
            Kom nemt igang
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default Navigation
