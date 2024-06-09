import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { IDriving } from "../../../interfaces/driving.interface"
import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import DrivingModal from "../components/modals/DrivingModal"
import { useAPI } from "../hooks/use-api"

const Drivingcompensation = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const [showModal, setShowModal] = useState(false)

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
        <DataTable
          title="Kørsel"
          metadata={metadata}
          currentPage={currentPage}
          onPageClick={(p) => setSearchParams((s) => ({ ...s, page: p }))}
          tableData={formattedData}
          tableHeaderActions={<>
            <button onClick={() => setShowModal(true)} className="border-solid border-2  bg-lightPrimary border-lightPrimary dark:border-[rgb(52,56,57)] dark:bg-transparent text-white font-standard-medium py-3 px-6 rounded-[14px] flex justify-center hover:bg-lightSecondaryLight hover:border-lightSecondaryLight hover:text-text dark:hover:bg-[rgb(52,56,57)] transition-colors duration-150">
              Tilføj Kørsel
              <DrivingModal isOpen={showModal} toggleModal={setShowModal} />
            </button>
          </>}
        />
      </div>
    </ContentContainer>
  )
}

export default Drivingcompensation
