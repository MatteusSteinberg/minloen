import fs from "fs"
import { PDFDocument, PDFImage, PDFPage, PageSizes, StandardFonts, rgb } from "pdf-lib"
import { IPayrollBalance, IPayrollDetailLine, IPayrollHoliday, IPayrollHolidayLine, IPayrollInfo, IPayrollPDF, IPayrollSaldiLine } from "../../../interfaces/payroll.interface"
import { defaultPage } from "./defaultPage"

const leftSideStartPix = 35

const decimals = 2

export async function payrollPdfTemplate(data: IPayrollPDF) {
  const doc = await PDFDocument.create()

  await doc.embedFont(StandardFonts.TimesRoman)

  const page = doc.addPage(PageSizes.A4)

  const logoBytes = fs.readFileSync("./lib/assets/Logo.png")
  const logoImage = await doc.embedPng(logoBytes)

  defaultPage(page, logoImage, data.employee, data.company)

  generateBanner(page, data.payroll)
  generateDetailSection(page, doc, logoImage, data)
  generateBalance(page, data.balance)
  generateFooter(page)

  return doc.save()
}

function checkIfDetailsIsFull(currentCord: number) {
  if (currentCord <= 180) {
    return true
  }
  return false
}

function checkIfSaldiIsFull(currentCord: number) {
  if (currentCord <= 40) {
    return true
  }
  return false
}

function generateBanner(page: PDFPage, payroll: IPayrollInfo) {
  // Banner
  page.drawRectangle({
    x: 0,
    y: page.getHeight() - 200,
    width: page.getWidth(),
    height: 65,
    color: rgb(0.14, 0.15, 0.2),
  })

  // LEFT SIDE
  page.drawText("LØNPERIODE", {
    x: leftSideStartPix,
    y: page.getHeight() - 160,
    size: 8,
    color: rgb(1, 1, 1),
  })

  page.drawText(payroll.month, {
    x: leftSideStartPix,
    y: page.getHeight() - 172,
    size: 8,
    color: rgb(1, 1, 1),
  })

  page.drawText(payroll.datePeriod, {
    x: leftSideStartPix,
    y: page.getHeight() - 184,
    size: 8,
    color: rgb(1, 1, 1),
  })

  // MIDDLE
  page.drawText("UDBETALINGSDATO", {
    x: page.getWidth() / 2 - 50,
    y: page.getHeight() - 160,
    size: 8,
    color: rgb(1, 1, 1),
  })
  page.drawText(payroll.paymentDate, {
    x: page.getWidth() / 2 - 50,
    y: page.getHeight() - 172,
    size: 8,
    color: rgb(1, 1, 1),
  })

  // RIGHT SIDE
  page.drawText("TIL UDBETALING", {
    x: page.getWidth() - 100,
    y: page.getHeight() - 160,
    size: 8,
    color: rgb(1, 1, 1),
  })
  page.drawText(payroll.salary ? payroll.salary.toFixed(decimals) : "", {
    x: page.getWidth() - 110,
    y: page.getHeight() - 180,
    size: 14,
    color: rgb(1, 1, 1),
  })
}

function generateDetailSection(page: PDFPage, doc: PDFDocument, logoImage: PDFImage, data: IPayrollPDF) {
  page.drawText("BESKRIVELSE", {
    x: leftSideStartPix + 30,
    y: page.getHeight() - 230,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText("GRUNDLAG", {
    x: page.getWidth() / 2 - 50,
    y: page.getHeight() - 230,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText("SATS", {
    x: page.getWidth() / 2 + 100,
    y: page.getHeight() - 230,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText("TOTAL", {
    x: page.getWidth() - 100,
    y: page.getHeight() - 230,
    size: 8,
    color: rgb(0, 0, 0),
  })

  let currentPage = page
  let newIndex = 0

  data.details.forEach((line) => {
    if (checkIfDetailsIsFull(currentPage.getHeight() - 250 - newIndex * 10)) {
      newIndex = 0
      currentPage = doc.addPage(PageSizes.A4)
      defaultPage(currentPage, logoImage, data.employee, data.company)
      newIndex++
    }
    generateDetailLine(currentPage, line, newIndex)
    newIndex++
  })
}

function generateDetailLine(page: PDFPage, line: IPayrollDetailLine, index: number) {
  page.drawText(index.toString(), {
    x: leftSideStartPix,
    y: page.getHeight() - 250 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(line.description, {
    x: leftSideStartPix + 30,
    y: page.getHeight() - 250 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(line.basis ? line.basis.toFixed(decimals) : "", {
    x: page.getWidth() / 2 - 50,
    y: page.getHeight() - 250 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(line.rate ?? "", {
    x: page.getWidth() / 2 + 100,
    y: page.getHeight() - 250 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(line.total ? line.total.toFixed(decimals) : "", {
    x: page.getWidth() - 100,
    y: page.getHeight() - 250 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })
}

function generateBalance(page: PDFPage, balance: IPayrollBalance) {
  page.drawLine({
    start: { x: 0, y: 200 },
    end: { x: page.getWidth(), y: 200 },
    thickness: 1,
    opacity: 0.5,
    color: rgb(0, 0, 0),
  })
  generateBalanceHoliday(page, balance.holidays)
  generateBalanceSaldi(page, balance.saldi)
}

function generateBalanceHoliday(page: PDFPage, holidays: Array<IPayrollHoliday>) {
  let titelYCord = page.getHeight() - 670
  let totalLines = 0
  holidays.forEach((holiday, index) => {
    if (index !== 0) {
      titelYCord -= 30
      totalLines += 2
    }
    generateFooterLineTitel(page, holiday, titelYCord)
    holiday.holidayLines.forEach((line) => {
      generateFooterLine(page, line, totalLines)
      titelYCord = page.getHeight() - 670 - totalLines * 10
      totalLines++
    })
  })
}

function generateFooterLineTitel(page: PDFPage, holiday: IPayrollHoliday, yCord: number) {
  page.drawText(holiday.description, {
    x: leftSideStartPix,
    y: yCord,
    size: 12,
    color: rgb(0, 0, 0),
  })

  if (holiday.optionOne) {
    page.drawText(holiday.optionOne, {
      x: leftSideStartPix + 90 * 1,
      y: yCord,
      size: 8,
      color: rgb(0, 0, 0),
    })
  }

  if (holiday.optionTwo) {
    page.drawText(holiday.optionTwo, {
      x: leftSideStartPix + 90 * 1.7,
      y: yCord,
      size: 8,
      color: rgb(0, 0, 0),
    })
  }

  if (holiday.optionThree) {
    page.drawText(holiday.optionThree, {
      x: leftSideStartPix + 90 * 2.45,
      y: yCord,
      size: 8,
      color: rgb(0, 0, 0),
    })
  }
}

function generateFooterLine(page: PDFPage, line: IPayrollHolidayLine, index: number) {
  page.drawText(line.description, {
    x: leftSideStartPix,
    y: page.getHeight() - 680 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })

  if (line.optionOne) {
    page.drawText(line.optionOne, {
      x: leftSideStartPix + 90 * 1,
      y: page.getHeight() - 680 - index * 10,
      size: 8,
      color: rgb(0, 0, 0),
    })
  }

  if (line.optionTwo) {
    page.drawText(line.optionTwo, {
      x: leftSideStartPix + 90 * 1.7,
      y: page.getHeight() - 680 - index * 10,
      size: 8,
      color: rgb(0, 0, 0),
    })
  }

  if (line.optionThree) {
    page.drawText(line.optionThree, {
      x: leftSideStartPix + 90 * 2.45,
      y: page.getHeight() - 680 - index * 10,
      size: 8,
      color: rgb(0, 0, 0),
    })
  }
}

function generateBalanceSaldi(page: PDFPage, saldiLines: Array<IPayrollSaldiLine>) {
  page.drawText("SALDI", {
    x: page.getWidth() - 200,
    y: page.getHeight() - 670,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page.drawText("I Ferieåret", {
    x: page.getWidth() - 100,
    y: page.getHeight() - 670,
    size: 12,
    color: rgb(0, 0, 0),
  })

  saldiLines.forEach((line, index) => {
    if (checkIfSaldiIsFull(page.getHeight() - 680 - index * 10)) {
      return
    }
    generateBalanceSaldiLine(page, line, index)
  })
}

function generateBalanceSaldiLine(page: PDFPage, line: IPayrollSaldiLine, index: number) {
  page.drawText(line.description, {
    x: page.getWidth() - 200,
    y: page.getHeight() - 680 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(line.value, {
    x: page.getWidth() - 100,
    y: page.getHeight() - 680 - index * 10,
    size: 8,
    color: rgb(0, 0, 0),
  })
}

function generateFooter(page: PDFPage) {
  page.drawLine({
    start: { x: 0, y: 30 },
    end: { x: page.getWidth(), y: 30 },
    thickness: 1,
    opacity: 0.5,
    color: rgb(0, 0, 0),
  })
}
