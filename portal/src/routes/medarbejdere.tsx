import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { IUser } from "../../../interfaces/user.interface"
import TranImage from "../assets/images/jonas1.png"
import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import { useAPI } from "../hooks/use-api"

const coworkersData = {
  headers: ["ID #", "Billede", "Navn", "Stilling", "Email", "Løn"],
  rows: [
    {
      "ID #": 1,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 2,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 3,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 4,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 5,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 6,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 7,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
    {
      "ID #": 8,
      Billede: TranImage,
      Navn: "Tobias Thien Tran",
      Stilling: "IT Support Elev",
      Email: "ttt@flc.dk",
      Løn: "18.057",
    },
  ],
}

const Coworkers = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  const { data } = useAPI<IUser[]>({ url: '/user/list', params: { page: 1 } })
  const { data: metadata } = useAPI<{ count: number, size: number }>({ url: '/user/list/meta' })

  const formattedData = useMemo(() => {

    const rows = (data || []).map((v) => {
      return {
        Billede: TranImage,
        Navn: v.name,
        Stilling: v.position,
        Email: v.email,
        "Medarbejder rettigheder": v.organizationRole === "admin" ? "Administrator" : "Medarbejder"
      }
    })
    return {
      headers: ["Billede", "Navn", "Stilling", "Email", "Medarbejder rettigheder"],
      rows
    }
  }, [data])



  return (
    <ContentContainer>
      <div className="">
        <Header title="Dine medarbejdere" />
      </div>
      <div className="">
        <DataTable title="Medarbejdere" actions tableData={formattedData} button="/ny-medarbejder" />
      </div>
    </ContentContainer>
  )
}

export default Coworkers
