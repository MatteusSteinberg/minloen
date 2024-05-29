import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { IUser } from "../../../interfaces/user.interface"
import TranImage from "../assets/images/jonas1.png"
import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import { useAPI } from "../hooks/use-api"

const Coworkers = () => {
    let [searchParams, setSearchParams] = useSearchParams()

    const currentPage = parseInt(searchParams.get("page") || "1")

    const { data } = useAPI<IUser[]>({ url: "/user/list", params: { page: currentPage } })
    const { data: metadata } = useAPI<{ count: number; size: number }>({ url: "/user/list/meta" })

    const formattedData = useMemo(() => {
        const rows = (data || []).map((v) => {
            return {
                Billede: TranImage,
                Navn: v.name,
                Stilling: v.position,
                Email: v.email,
                "Medarbejder rettigheder": v.organizationRole === "admin" ? "Administrator" : "Medarbejder",
            }
        })
        return {
            headers: ["Billede", "Navn", "Stilling", "Email", "Medarbejder rettigheder"],
            rows,
        }
    }, [data])

    return (
        <ContentContainer>
            <div className="">
                <Header title="Dine medarbejdere" />
            </div>
            <div className="">
                <DataTable title="Medarbejdere" metadata={metadata} currentPage={currentPage} onPageClick={(p) => setSearchParams((s) => ({ ...s, page: p }))} actions tableData={formattedData} button="/ny-medarbejder" />
            </div>
        </ContentContainer>
    )
}

export default Coworkers
