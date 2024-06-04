import _ from "lodash"
import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useSearchParam, useSet } from "react-use"
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
  const { data: payrollData, create, update } = useAPI<IUser>({
    url: "/payroll",
    id,
    params: { fixed: isFixedPayroll ? "true" : null },
    opts: { autoGet: !!id }
  }
  )


  const currentForm: IPayrollSetup = useMemo(() => {
    return {
      ..._.omit(payrollData, Array.from(edited)),
      ...form
    } as any
  }, [form, edited, payrollData])

  const formChange = useCallback(
    (path: string, value: any) => {
      if (!path.includes("supplements") && !path.includes("deduction")) {
        add(path)
      }
      setForm((f) => {
        f = _.set(f, path, value)
        return { ...f }
      })
    },
    [add]
  )

  const onSubmit = async () => {
    const method = !!payrollData ? create : update
    await method({
      ...currentForm,
      fixed: isFixedPayroll,
      user: data?._id,
    })
  }

  return (
    <ContentContainer>
      <div className="">
        <Header history="/medarbejdere" title="Opret lønseddel" />
      </div>
      <div className="relative flex flex-col-reverse items-start justify-between gap-4 lg:flex-row">
        <div className="lg:sticky relative lg:top-4 left-0 flex flex-col w-full lg:w-2/5 xl:min-w-[400px] gap-4">
          <Summary user={data} payrollSetup={currentForm} onSubmit={onSubmit} />
        </div>
        <div className="relative flex flex-col w-full gap-4 lg:w-3/5 xl:w-2/4">
          <PaycheckForm user={data} payrollSetup={currentForm} onFormChange={formChange} />
        </div>
      </div>
    </ContentContainer>
  )
}

export default AddPaycheck
