import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { IPayroll } from "../../../../interfaces/payroll.interface"
import { useAPI } from "../../hooks/use-api"
import { useAuth } from "../../hooks/use-auth"
import downloadURI from "../../lib/download-uri"
import Button from "../elements/Button"
import DataTable from "../elements/DataTable"
import GeneratePayrollModal from "../modals/GeneratePayrollModal"

interface ISalaryTable {
  withAction?: boolean
  userId?: string
}

const SalaryTable = ({ withAction, userId }: ISalaryTable) => {
  const { token } = useAuth()
  let [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get("page") || "1")

  const { data, mutate } = useAPI<Array<IPayroll>>({ url: "/payroll/list", id: userId, params: { page: currentPage } })
  const { data: meta, mutate: mutateMeta } = useAPI<{ count: number, size: number }>({ url: "/payroll/list/meta", id: userId })

  const [showModal, setShowModal] = useState(false)

  const rows = useMemo(() => {

    return (data || []).map(v => ({
      id: (v as any)._id,
      Periode: `${dayjs(v.dateFrom).format("DD-MM-YYYY")} - ${dayjs(v.dateTo).format("DD-MM-YYYY")}`,
      "Til udbetaling": v.pdf?.payroll.salary.toFixed(2),
      "Udbetalingsdato": v.pdf?.payroll?.paymentDate
    }))
  }, [data])

  const handlePdfClick = (id: string, period: string) => {
    const pdfUrl = `${process.env.REACT_APP_API || ''}/api/payroll/pdf/${id}`
    downloadURI(
      pdfUrl,
      `lønseddel ${period}.pdf`,
      token ?? ""
    )
  }

  return <DataTable
    tableData={{ headers: ["Periode", "Til udbetaling", "Udbetalingsdato"], rows }}
    currentPage={currentPage}
    metadata={meta}
    onPageClick={(p) => setSearchParams((s) => ({ ...s, page: p }))}
    title="Lønsedler"
    actions={(data) => <>
      <td className="flex items-center justify-end px-8 py-4 text-right text-nowrap">
        <Button onClick={() => handlePdfClick(data.id, data.Periode)} background="secondarySupport" color="white">
          Download PDF
        </Button>
      </td>
    </>}
    tableHeaderActions={<>
      {withAction && <>
        <button onClick={() => setShowModal(true)} className="border-solid border-2  bg-lightPrimary border-lightPrimary dark:border-[rgb(52,56,57)] dark:bg-transparent text-white font-standard-medium py-3 px-6 rounded-[14px] flex justify-center hover:bg-lightSecondaryLight hover:border-lightSecondaryLight hover:text-text dark:hover:bg-[rgb(52,56,57)] transition-colors duration-150">
          Opret lønseddel
          <GeneratePayrollModal userId={userId} isOpen={showModal} toggleModal={(v) => {
            setShowModal(v)
            mutate()
            mutateMeta()
          }} />
        </button>
      </>}
    </>}
  />
}

export default SalaryTable