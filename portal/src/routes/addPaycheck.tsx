/* import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { IPayrollSetup } from "../../../interfaces/payroll.interface"
import { IUser } from "../../../interfaces/user.interface"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import PaycheckForm from "../components/layouts/paychecks/PaycheckForm"
import Summary from "../components/layouts/paychecks/Summary"
import { useAPI } from "../hooks/use-api"

const AddPaycheck = () => {
  const { id } = useParams()
  const isFixedPayrollParam = useSearchParam("fast")

  const [form, setForm] = useState<IPayrollSetup>({})
  const [edited, { add }] = useSet<string>()

  const isFixedPayroll = isFixedPayrollParam === "true"

  const { data } = useAPI<IUser>({ url: "/user", id })

  const currentForm: IPayrollSetup = useMemo(() => {

    return {
      ...form
    }
  }, [form])

  const formChange = useCallback((path: string, value: any) => {
    add(path)
    setForm(f => {
      f = _.set(f, path, value)
      return { ...f }
    })
  }, [add])

  return (
    <ContentContainer>
      <div className="">
        <Header title="Opret lønseddel" />
      </div>
      <div className="relative flex items-start justify-between gap-4">
        <div className="relative flex flex-col w-1/4 gap-4">
          <Summary user={data} payrollSetup={currentForm} />
        </div>
        <div className="relative flex flex-col w-2/4 gap-4">
          <PaycheckForm user={data} payrollSetup={currentForm} />
        </div>
      </div>
    </ContentContainer>
  )
}

export default AddPaycheck*/
