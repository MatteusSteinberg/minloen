import { IPayrollSetup } from "../../../../../interfaces/payroll.interface"
import { IUser } from "../../../../../interfaces/user.interface"

interface IPayrollSummary {
  user?: IUser
  payrollSetup?: IPayrollSetup
}

const Summary = ({ payrollSetup, user }: IPayrollSummary) => {
  return (
    <div className="w-full p-8 bg-white border border-solid dark:bg-darkPrimarySupport rounded-3xl shadow-custom border-lightBorder dark:border-darkBorder">
      <div className="flex flex-col gap-8">
        <p className="text-text dark:text-white font-medium-normal">{""}</p>
        <ul className="flex flex-col justify-start gap-2">
          <li className="flex items-center justify-between pb-2 border-b border-solid text-text dark:text-white border-lightBorder dark:border-darkBorder font-standard-normal">
            <p>Gage</p>
            <p>{""}</p>
          </li>
          <li className="flex items-center justify-between pb-2 border-b border-solid text-text dark:text-white border-lightBorder dark:border-darkBorder font-standard-normal">
            <p>ATP af Løn</p>
            <p>{"-99.00"}</p>
          </li>
          <li className="flex items-center justify-between pb-2 border-b border-solid text-text dark:text-white border-lightBorder dark:border-darkBorder font-standard-normal">
            <p>AM-Indkomst</p>
            <p>{""}</p>
          </li>
          <li className="flex items-center justify-between pb-2 border-b border-solid text-text dark:text-white border-lightBorder dark:border-darkBorder font-standard-normal">
            <p>AM-Bidrag</p>
            <p>{""}</p>
          </li>
          <li className="flex items-center justify-between pb-2 border-b border-solid text-text dark:text-white border-lightBorder dark:border-darkBorder font-standard-normal">
            <p>A-Skat</p>
            <p>{""}</p>
          </li>
        </ul>
        <div className="py-4 text-center text-white bg-lightPrimary dark:bg-gradientmain rounded-2xl font-h4">
          <p className="-mt-1">13.951 DKK</p>
        </div>
      </div>
    </div>
  )
}

export default Summary
