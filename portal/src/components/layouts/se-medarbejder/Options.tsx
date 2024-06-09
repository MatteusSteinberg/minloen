import { Link, useParams } from "react-router-dom"
import { IPayrollSetup } from "../../../../../interfaces/payroll.interface"
import { useAPI } from "../../../hooks/use-api"

const Options = ({ canCreatePayroll }: { canCreatePayroll: boolean }) => {
  const { id } = useParams()

  const { data: fixedPayrollSetup } = useAPI<IPayrollSetup>({ url: "/payroll", id, params: { fixed: "true" } })
  const { data: comingPayrollSetup } = useAPI<IPayrollSetup>({ url: "/payroll", id, params: { fixed: "false" } })

  return (
    <div className="flex flex-col items-start justify-start gap-4 pb-3 mb-16 border-b border-solid sm:items-center sm:flex-row border-lightBorder dark:border-darkBorder">
      {canCreatePayroll && (
        <>
          <Link to={`/opret-loenseddel/${id}?fast=true`} className="text-text dark:text-white font-small-normal">
            {fixedPayrollSetup ? "Konfigurer" : "Konfigurer"} fast lønseddel
          </Link>
          <Link to={"/opret-loenseddel/" + id} className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">
            {!!comingPayrollSetup ? "Konfigurer" : "Konfigurer ny"} tilpasset lønseddel for kommende måned
          </Link>
        </>
      )}
    </div>
  )
}

export default Options
