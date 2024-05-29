import Box from "../components/globals/Box"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import Calender from "../components/layouts/calender/Calender"

const boxData = [
    {
        title: "Fridage (pr. år)",
        value: "41",
    },
    {
        title: "Sygedage i alt (pr. år)",
        value: "12",
    },
    {
        title: "Feriedage (pr. år)",
        value: "26",
    },
]

const Absence = () => {
    return (
        <ContentContainer>
            <div>
                <Header title="Dine fravær/sygedage" />
            </div>
            <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-12">
                {boxData.map((data, index) => (
                    <Box title={data.title} value={data.value} />
                ))}
            </div>
            <div className="">
                <Calender />
            </div>
        </ContentContainer>
    )
}

export default Absence
