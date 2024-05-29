import React, { useState } from "react"

const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date())

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

    return (
        <div>
            <div className="flex items-center justify-between gap-6 py-5">
                <span className="text-white font-default font-normal text-[24px] leading-6">
                    {monthNames[month]} {year}
                </span>
                <div className="flex items-center gap-4">
                    <button onClick={handlePrevMonth} className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full bg-primaryLight">
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 9L2.20711 5.70711C1.81658 5.31658 1.81658 4.68342 2.20711 4.29289L5.5 1" className="stroke-primarySupport" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>
                    <button onClick={handleNextMonth} className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full bg-primaryLight">
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 9L4.79289 5.70711C5.18342 5.31658 5.18342 4.68342 4.79289 4.29289L1.5 1" className="stroke-primarySupport" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="border border-solid rounded-2xl border-border shadow-custom">
                <div className="grid grid-cols-7 bg-[#1B1F20] rounded-t-2xl border-b border-solid border-border">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="py-4 text-center text-white font-medium-normal">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px overflow-hidden rounded-b-2xl">
                    {blankDays.map((day, index) => (
                        <button key={`prev-${index}`} className="relative p-2 h-28 text-center text-border py-9 bg-[rgba(20,23,24,0.3)] font-medium-semibold">
                            <span className="absolute left-3 top-3">{day}</span>
                        </button>
                    ))}
                    {daysArray.map((day) => (
                        <button key={day} className="relative p-2 text-center text-white h-28 bg-primarySupport py-9 font-medium-semibold">
                            <span className="absolute left-3 top-3">{day}</span>
                            {/* <CalenderTags type="vacation" message="Ferie" /> */}
                        </button>
                    ))}
                    {trailingDays.map((day, index) => (
                        <button key={`next-${index}`} className="relative p-2 h-28 text-center py-9 text-border bg-[rgba(20,23,24,0.3)] font-medium-semibold">
                            <span className="absolute left-3 top-3">{day}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Calendar