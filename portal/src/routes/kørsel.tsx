import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { IDriving } from "../../../interfaces/driving.interface"
import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import { useAPI } from "../hooks/use-api"
import dayjs, { Dayjs } from 'dayjs'

const Drivingcompensation = () => {
    let [searchParams, setSearchParams] = useSearchParams()

    const currentPage = parseInt(searchParams.get("page") || "1")
    const { data } = useAPI<IDriving[]>({ url: "/driving/list", params: { page: currentPage } })
    const { data: metadata } = useAPI<{ count: number; size: number }>({ url: "/driving/list/meta" })

    const formattedData = useMemo(() => {
        const rows = (data || []).map((v) => {
            return {
                ID: v._id,
                Dato: dayjs(v.date).format("YYYY-MM-DD"),
                Fra: v.locationFrom,
                Til: v.locationTo,
                Km: v.distance + " km",
            }
        })
        return {
            headers: ["ID", "Dato", "Til", "Fra", "Km"],
            rows,
        }
    }, [data])

    return (
        <ContentContainer>
            <div>
                <Header title="Din kørsel" />
            </div>
            <div className="">
                <DataTable title="Kørsel" 
                metadata={metadata} 
                currentPage={currentPage} 
                onPageClick={(p) => setSearchParams((s) => ({ ...s, page: p }))} 
                tableData={formattedData}
                drivingModal
                />
            </div>
        </ContentContainer>
    )
}

export default Drivingcompensation
