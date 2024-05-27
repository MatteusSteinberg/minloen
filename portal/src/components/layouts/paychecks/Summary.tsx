interface ISummary {
    id: number
    date: string
}

const Summary = ({ date, id }: ISummary) => {
    return (
        <div className="p-8 bg-primarySupport rounded-3xl shadow-custom">
            <div className="flex flex-col gap-8">
                <p className="text-white font-large-normal">{date}</p>
            </div>
        </div>
    )
}

export default Summary
