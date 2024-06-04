import { Link, useParams } from "react-router-dom"
import { IPayrollSetup } from "../../../../../interfaces/payroll.interface"
import { useAPI } from "../../../hooks/use-api"

const Options = ({ canCreatePayroll }: { canCreatePayroll: boolean }) => {
  const { id } = useParams()

  const { data: fixedPayrollSetup } = useAPI<IPayrollSetup>({ url: "/payroll", id, params: { fixed: "true" } })
  const { data: comingPayrollSetup } = useAPI<IPayrollSetup>({ url: "/payroll", id, params: { fixed: "false" } })

  return (
    <div className="flex items-center justify-between pb-3 mb-16 border-b border-solid border-lightBorder dark:border-darkBorder">
      <div className="flex items-center justify-center gap-4">
        <p className="text-text dark:text-white font-small-normal">Profil</p>
        <p className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">Medarbejder</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        {canCreatePayroll && <>
          <Link to={`/opret-loenseddel/${id}?fast=true`} className="text-text dark:text-white font-small-normal">
            {fixedPayrollSetup ? "Rediger" : "Opret"} fast lønseddel
          </Link>
          <Link to={"/opret-loenseddel/" + id} className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">
            {!!comingPayrollSetup ? "Rediger" : "Opret"} tilpasset lønseddel for kommende måned
          </Link>
        </>}
      </div>
    </div>
  )
}

export default Options
