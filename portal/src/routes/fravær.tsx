import { AbsenceType } from "../../../interfaces/absence.interface"
import Box from "../components/globals/Box"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import Calender from "../components/layouts/calender/Calender"
import { useAPI } from "../hooks/use-api"

interface IAbsenceMetadata {
    _id: AbsenceType
    total: number
}

const Absence = () => {
    const { data } = useAPI<IAbsenceMetadata[]>({ url: "/absence/metadata", opts: { autoGet: true } })

    const idToTitleMap = {
        sick: "Sygedage",
        offday: "Fridage",
        vacation: "Feriedage",
    }

    const formattedMetadata = data?.map((d) => ({
        title: idToTitleMap[d._id] || "Ukendt",
        value: d.total.toString(),
    }))

    return (
        <ContentContainer>
            <div>
                <Header title="Dine fravær/sygedage" />
            </div>
            <div className="grid grid-cols-1 grid-rows-1 gap-4 mb-12 md:grid-cols-3">
                {formattedMetadata?.map((data, index) => (
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
