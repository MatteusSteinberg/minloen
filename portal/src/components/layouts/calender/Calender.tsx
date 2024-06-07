import { useMemo, useState } from "react"
import { AbsenceType } from "../../../../../interfaces/absence.interface"
import { useAPI } from "../../../hooks/use-api"
import LeaveModal from "../../modals/LeaveModal"
import CalenderTags from "./CalenderTags"

const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()

interface IAbsenceRange {
    dateFrom: Date
    dateTo: Date
    cause: AbsenceType
}

const Calendar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<[Date, Date] | undefined>(undefined)
    const [currentDate, setCurrentDate] = useState(new Date())

    const { data: absenceRanges } = useAPI<IAbsenceRange[]>({ url: "/absence/list", opts: { autoGet: true }, params: { date: currentDate } })

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const days = daysInMonth(year, month)
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const lastDayOfMonth = new Date(year, month, days).getDay()

    const prevMonthDays = daysInMonth(year, month - 1)
    const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => prevMonthDays - firstDayOfMonth + i + 1)
    const daysArray = Array.from({ length: days }, (_, i) => i + 1)
    const trailingDays = Array.from({ length: 6 - lastDayOfMonth }, (_, i) => i + 1)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const isDayInAbsenceRange = useMemo(
        () => (day: number) => {
            const date = new Date(year, month, day)
            const range = absenceRanges?.find((range) => date >= new Date(range.dateFrom) && date <= new Date(range.dateTo))
            return range ? range.cause : null
        },
        [absenceRanges, year, month]
    )

    return (
        <div>
            <div className="flex items-center justify-between gap-6 py-5">
                <span className="text-text dark:text-white font-default font-normal text-[24px] leading-6">
                    {monthNames[month]} {year}
                </span>
                <div className="flex items-center gap-4">
                    <button onClick={handlePrevMonth} className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full bg-lightPrimary dark:bg-darkPrimaryLight">
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 9L2.20711 5.70711C1.81658 5.31658 1.81658 4.68342 2.20711 4.29289L5.5 1" className="stroke-white dark:stroke-darkPrimarySupport" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>
                    <button onClick={handleNextMonth} className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full bg-lightPrimary dark:bg-darkPrimaryLight">
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 9L4.79289 5.70711C5.18342 5.31658 5.18342 4.68342 4.79289 4.29289L1.5 1" className="stroke-white dark:stroke-darkPrimarySupport" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="border border-solid rounded-2xl border-lightBorder dark:border-darkBorder shadow-custom">
                <div className="grid grid-cols-7 bg-white dark:bg-[#1B1F20] rounded-t-2xl border-b border-solid border-lightBorder dark:border-darkBorder">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="py-4 text-center text-text dark:text-white font-medium-normal">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px overflow-hidden rounded-b-2xl">
                    {blankDays.map((day, index) => (
                        <button
                            onClick={() => {
                                setIsOpen(true)
                                setSelectedDate([new Date(year, month, day), new Date(year, month, day)])
                            }}
                            key={`prev-${index}`}
                            className="relative p-2 h-28 text-center text-text dark:text-darkBorder py-9 bg-[rgba(20,23,24,0.1)] dark:bg-[rgba(20,23,24,0.3)] font-medium-semibold">
                            <span className="absolute left-3 top-3">{day}</span>
                        </button>
                    ))}
                    {daysArray.map((day) => (
                        <button
                            onClick={() => {
                                setIsOpen(true)
                                setSelectedDate([new Date(year, month, day), new Date(year, month, day)])
                            }}
                            key={day}
                            className="relative p-2 text-center bg-white text-text dark:text-white h-28 dark:bg-darkPrimarySupport py-9 font-medium-semibold">
                            <span className="absolute left-3 top-3">{day}</span>
                            {isDayInAbsenceRange(day) && <CalenderTags key={isDayInAbsenceRange(day)} type={isDayInAbsenceRange(day)} />}
                        </button>
                    ))}
                    {trailingDays.map((day, index) => (
                        <button
                            onClick={() => {
                                setIsOpen(true)
                                setSelectedDate([new Date(year, month, day), new Date(year, month, day)])
                            }}
                            key={`next-${index}`}
                            className="relative p-2 h-28 text-center py-9 text-text bg-[rgba(20,23,24,0.1)] dark:bg-[rgba(20,23,24,0.3)] font-medium-semibold">
                            <span className="absolute left-3 top-3">{day}</span>
                        </button>
                    ))}
                </div>
            </div>
            <LeaveModal isOpen={isOpen} selectedDate={selectedDate} toggleModal={setIsOpen} />
        </div>
    )
}

export default Calendar
