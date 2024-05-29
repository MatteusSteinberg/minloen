interface ISummary {
    id: number
    date: string
    gage: number
    atp: number
    amIncome: number
    amContribution: number
    aTax: number
}

const Summary = ({ date, id, gage, aTax, amContribution, amIncome, atp }: ISummary) => {
    return (
        <div className="w-full p-8 bg-primarySupport rounded-3xl shadow-custom">
            <div className="flex flex-col gap-8">
                <p className="text-white font-medium-normal">{date}</p>
                <ul className="flex flex-col justify-start gap-2">
                    <li className="flex items-center justify-between pb-2 text-white border-b border-solid border-border font-standard-normal">
                        <p>Gage</p>
                        <p>{gage}</p>
                    </li>
                    <li className="flex items-center justify-between pb-2 text-white border-b border-solid border-border font-standard-normal">
                        <p>ATP af Løn</p>
                        <p>{atp}</p>
                    </li>
                    <li className="flex items-center justify-between pb-2 text-white border-b border-solid border-border font-standard-normal">
                        <p>AM-Indkomst</p>
                        <p>{amIncome}</p>
                    </li>
                    <li className="flex items-center justify-between pb-2 text-white border-b border-solid border-border font-standard-normal">
                        <p>AM-Bidrag</p>
                        <p>{amContribution}</p>
                    </li>
                    <li className="flex items-center justify-between pb-2 text-white border-b border-solid border-border font-standard-normal">
                        <p>A-Skat</p>
                        <p>{aTax}</p>
                    </li>
                </ul>
                <div className="py-4 text-center text-white bg-gradientmain rounded-2xl font-h4">
                    <p className="-mt-1">13.951 DKK</p>
                </div>
            </div>
        </div>
    )
}

export default Summary
