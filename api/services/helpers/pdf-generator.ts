import { payrollPdfTemplate } from "../../lib/pdf-templates/payroll"

import fs from "fs"
import path from 'path'
import { IPayrollPDF } from '../../../interfaces/payroll.interface'

export interface IPdf {
  key: "payroll" | "driving" | "file"
  data: IPayrollPDF | any
  mock?: boolean
}

export async function pdfMaker({ key, data, mock }: IPdf): Promise<Uint8Array | null> {
  switch (key) {
    case "payroll":
      if (mock) {
        const mockData = fs.readFileSync(path.join(__dirname, '../../lib/pdf-templates/mock/mock-payroll.json'), 'utf-8')
        return await payrollPdfTemplate(JSON.parse(mockData))
      }
      return await payrollPdfTemplate(data)
    case "driving":
      return
    case "file":
      return
    default:
      return null
  }
}
