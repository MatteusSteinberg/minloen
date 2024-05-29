import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import PaycheckForm from "../components/layouts/paychecks/PaycheckForm"
import Summary from "../components/layouts/paychecks/Summary"

type Props = {}

const paySummary = {
    id: 1,
    date: "01/05/2024 - 31/05/2024",
    gage: 30000,
    atp: -99.0,
    amIncome: 30159.33,
    amContribution: -2413.0,
    aTax: -9235.0,
}

const AddPaycheck = (props: Props) => {
    return (
        <ContentContainer>
            <div className="">
                <Header title="Opret lønseddel" history />
            </div>
            <div className="relative flex items-start justify-between gap-4">
                <div className="relative flex flex-col w-1/4 gap-4">
                    <Summary {...paySummary} />
                </div>
                <div className="relative flex flex-col w-2/4 gap-4">
                    <PaycheckForm />
                </div>
            </div>
        </ContentContainer>
    )
}

export default AddPaycheck
