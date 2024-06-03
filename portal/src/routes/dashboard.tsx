import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { IUser } from "../../../interfaces/user.interface"
import TranImage from "../assets/images/jonas1.png"
import DataTable from "../components/elements/DataTable"
import Box from "../components/globals/Box"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import { useAPI } from "../hooks/use-api"

const boxData = [
    {
        title: "Medarbejdere",
        value: "28",
    },
    {
        title: "Medarbejder fravær",
        value: "18,9 %",
    },
    {
        title: "Lønudgifter",
        value: "127.826,00 DKK",
    },
]

const graphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [65, 59, 72, 75, 52, 55],
}

const Dashboard = () => {
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
                id: v._id,
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
                <Header title="Virksomheds oversigt" />
            </div>
            <div>
                <p className="mb-2 text-text dark:text-white font-large-normal">Statistikker</p>
                <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-rows-1 lg:grid-cols-3">
                    {boxData.map((data, index) => (
                        <Box graph title={data.title} graphData={graphData} value={data.value} />
                    ))}
                </div>
            </div>
            <div className="mt-12">
                <DataTable
                    title="Medarbejdere"
                    metadata={metadata}
                    currentPage={currentPage}
                    onPageClick={(p) => setSearchParams((s) => ({ ...s, page: p }))}
                    actions={(user: IUser) => (
                        <>
                            <td className="flex items-center justify-end px-8 py-4 text-right text-nowrap">
                                <Link to={`/se-medarbejder/${user.id}`} className="mr-2 flex items-center text-darkPrimaryLight bg-gradientmain border border-solid border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-12 w-12 justify-center">
                                    <EyeIcon className="w-5 h-5" />
                                </Link>
                                <Link to="/" className="mr-2 flex items-center text-darkPrimaryLight bg-gradientmain border border-solid border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-12 w-12 justify-center">
                                    <PencilIcon className="w-5 h-5" />
                                </Link>
                            </td>
                        </>
                    )}
                    tableData={formattedData}
                    button="/ny-medarbejder"
                />
            </div>
        </ContentContainer>
    )
}

export default Dashboard
