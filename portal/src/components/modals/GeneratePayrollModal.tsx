import { useState } from "react"
import { useAPI } from "../../hooks/use-api"
import Button from "../elements/Button"
import Dropdown from "../elements/Dropdown"
import Base from "./Base"
import "./customDatePicker.css"

interface IGeneratePayrollModal {
  isOpen: boolean
  toggleModal: (v: boolean) => void
  userId?: string
}

const months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]

const years = [2022, 2023, 2024, 2025, 2026]

const GeneratePayrollModal = ({ isOpen, toggleModal, userId }: IGeneratePayrollModal) => {
  const { create } = useAPI({ url: "/payroll/generate", id: userId, opts: { autoGet: false } })

  const [form, setForm] = useState<{ month?: string, year?: number }>({})

  const handleSubmit = async () => {
    const res = await create(form)
    if (res.error) {

    } else {
      toggleModal(false)
    }
  }

  return (
    <Base isOpen={isOpen} title="Opret lønseddel" toggleModal={toggleModal}>
      <div className="px-12 my-6">
        <div className="flex flex-row gap-2">
          <Dropdown
            onChange={(v: string) => setForm(f => ({ ...f, month: v }))}
            value={form.month}
            name="Måned" options={months.map(v => ({ label: v, value: v }))} />
          <Dropdown
            onChange={(v: number) => setForm(f => ({ ...f, year: v }))}
            value={form.year}
            name="Måned" options={years.map(v => ({ label: v.toString(), value: v }))} />
        </div>
        <div className="my-12 flex flex-row gap-3 w-full justify-items-stretch">
          <Button background="primaryLight" onClick={handleSubmit} color="text" >
            Opret lønseddel
          </Button>
          <Button background="secondarySupport" color="white">Annuller</Button>
        </div>
      </div>
    </Base>
  )
}

export default GeneratePayrollModal
