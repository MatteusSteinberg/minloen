import { Types } from "mongoose"

import { payrollPdfTemplate } from "../../lib/pdf-templates/payroll"

import fs from "fs"

export interface IPdf {
    key: string
    data?: object | Types.ObjectId | string
}

export async function pdfMaker({ key, data }: IPdf): Promise<string | null> {
    switch (key) {
        case "payroll":
            fs.writeFileSync("filteName.pdf", await payrollPdfTemplate(), "base64")
        case "driving":
            return
        case "file":
            return
        default:
            return null
    }
}
