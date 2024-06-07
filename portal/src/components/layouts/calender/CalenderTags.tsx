import { AbsenceType } from "../../../../../interfaces/absence.interface"

interface ICalenderTag {
    type: AbsenceType | null
}

const CalenderTags = ({ type }: ICalenderTag) => {
    const idToTitleMap = {
        sick: "Sygedage",
        offday: "Fridage",
        vacation: "Ferie",
    }

    const formattedMessage = type ? idToTitleMap[type] : "Ukendt"

    return <div className={`absolute w-[calc(100%-12px)] h-8 flex items-center justify-center left-1/2 -translate-x-1/2 bottom-3 text-[14px] font-normal text-white rounded-lg ${type === "vacation" && "bg-gradientmain"} ${type === "sick" && "bg-error"} ${type === "offday" && "bg-gradientmain"}`}>{formattedMessage}</div>
}

export default CalenderTags
