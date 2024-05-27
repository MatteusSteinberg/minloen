import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import Summary from "../components/layouts/paychecks/Summary"

type Props = {}

const paycheck = (props: Props) => {
    return (
        <ContentContainer>
            <div className="">
                <Header title="Opret lønseddel" history />
            </div>
            <div className="relative flex items-start justify-between gap-4">
                <div className="relative flex flex-col w-1/5 gap-4">
                    <Summary date="01/05/2024 - 31/05/2024" id={1} />
                </div>
                <div className="relative flex flex-col w-3/5 gap-4">
                    <div className="p-8 bg-primarySupport rounded-3xl shadow-custom"></div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default paycheck
