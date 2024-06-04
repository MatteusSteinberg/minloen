import _ from "lodash"
import { useMemo } from "react"
import { IPayrollSetup } from "../../../../../interfaces/payroll.interface"
import { IUser } from "../../../../../interfaces/user.interface"
import { workplacePensionInstitues } from "../../../routes/ny-medarbejder"
import Button from "../../elements/Button"

interface IPayrollSummary {
  user?: IUser
  payrollSetup?: IPayrollSetup
  onSubmit?: () => Promise<void>
}

const ListItem = ({ name, value }: { name: string, value: string | number }) => {

  const v = useMemo(() => {
    if (typeof value === "number") {
      return value.toFixed(2)
    }
    return value
  }, [value])

  return <li className="flex items-center justify-between pb-2 border-b border-solid text-text dark:text-white border-lightBorder dark:border-darkBorder font-standard-normal">
    <p>{name}</p>
    <p>{v}</p>
  </li>
}

const Summary = ({ payrollSetup, user, onSubmit }: IPayrollSummary) => {

  const salaryNumbers = useMemo(() => {

    const salary = user?.salaryType === "salary" ?
      payrollSetup?.wageInfo?.salary || 0 :
      (payrollSetup?.wageInfo?.hourlyWage || 0) * (payrollSetup?.wageInfo?.numberOfHours || 0)


    let amIncome = _.sum([salary, -99, ...(payrollSetup?.supplements || []).map(v => v.value || 0)])

    let amPensionName = ""
    let amPension = 0

    if (!!user?.workplacePension?.institute) {
      amPensionName = workplacePensionInstitues.find(x => x.value === user.workplacePension?.institute)?.label || ""
      amPension = amIncome * 0.02
      amIncome -= amPension
    }

    let amContribution = amIncome * 0.08

    const taxDeduction = payrollSetup?.wageInfo?.taxDeduction || 0
    const salaryWithDeduction = amIncome - taxDeduction
    let aTax = (salaryWithDeduction - amContribution) * 0.38
    let newSalary = salaryWithDeduction - (amContribution + aTax) + taxDeduction

    if (payrollSetup?.benefits?.lunch) {
      newSalary -= payrollSetup?.benefits?.lunch
    }

    return {
      salary,
      atp: -99,
      amPensionName,
      amPension: amPension * -1,
      supplement: payrollSetup?.supplements || [],
      deduction: payrollSetup?.deduction || [],
      amIncome: amIncome,
      amContribution,
      aTax: aTax,
      taxDeduction,
      newSalary: newSalary,
      lunch: payrollSetup?.benefits?.lunch || 0
    }
  }, [payrollSetup, user])

  return (
    <div className="w-full p-8 bg-white border border-solid dark:bg-darkPrimarySupport rounded-3xl shadow-custom border-lightBorder dark:border-darkBorder">
      <div className="flex flex-col gap-8">
        <p className="text-text dark:text-white font-medium-normal">{""}</p>
        <ul className="flex flex-col justify-start gap-2">
          <ListItem name="Løn" value={salaryNumbers.salary} />
          {salaryNumbers.supplement.map((supp, index) => {
            return <ListItem
              key={supp.id}
              name={supp.name || "Tillæg "}
              value={supp.value}
            />
          })}
          <ListItem name="ATP af Løn" value={salaryNumbers.atp} />
          {salaryNumbers.amPensionName && <>
            <ListItem name={`AM-pension - Eget bidrag (${salaryNumbers.amPensionName})`} value={salaryNumbers.amPension} />
          </>}
          <ListItem name="AM-Indkomst" value={salaryNumbers.amIncome} />
          <ListItem name="AM-Bidrag" value={salaryNumbers.amContribution} />
          {!isNaN(salaryNumbers.taxDeduction) && salaryNumbers.taxDeduction !== 0 && <>
            <ListItem name="Fradrag" value={payrollSetup?.wageInfo?.taxDeduction || 0} />
          </>}
          <ListItem name={"A-Skat"} value={salaryNumbers.aTax} />
          {!isNaN(salaryNumbers.lunch) && salaryNumbers.lunch !== 0 && <>
            <ListItem name={"Frokost"} value={salaryNumbers.lunch} />
          </>}
        </ul>
        <div className="py-4 text-center text-white bg-lightPrimary dark:bg-gradientmain rounded-2xl font-h4">
          <p className="-mt-1">{(salaryNumbers.newSalary || 0).toFixed(2)} DKK</p>
        </div>
        <Button background="primaryLight" onClick={onSubmit} color="text">Gem lønseddel</Button>
      </div>
    </div>
  )
}

export default Summary
