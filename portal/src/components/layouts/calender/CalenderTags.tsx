interface ICalenderTag {
    type: "vacation" | "sick" | "offday"
    message: "Ferie" | "Syg" | "Fridag"
}

const CalenderTags = ({ type, message }: ICalenderTag) => {
    return <div className={`absolute w-[calc(100%-12px)] h-8 flex items-center justify-center left-1/2 -translate-x-1/2 bottom-3 text-[14px] font-normal text-white rounded-lg ${type === "vacation" && "bg-gradientmain"} ${type === "sick" && "bg-error"} ${type === "offday" && "bg-gradientmain"}`}>{message}</div>
}

export default CalenderTags
