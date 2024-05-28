import fs from "fs"
import { PDFDocument, PDFImage, PDFPage, PageSizes, StandardFonts, rgb } from "pdf-lib"
import { defaultPage } from "./defaultPage"

const leftSideStartPix = 35

interface IDetailLine {
    a: string
    b: string
    c: string
    d: string
}

interface ISaldiLine {
    a: string
    b: string
}

interface IHolidayLine {
    name: string
    optionOneValue: string
    optionTwoValue: string
    optionThreeValue: string
}

interface IHoliday {
    name: string
    optionOne: string
    optionTwo: string
    optionThree: string
    holidayLines: Array<IHolidayLine>
}

export async function payrollPdfTemplate(data?: object) {
    const doc = await PDFDocument.create()

    await doc.embedFont(StandardFonts.TimesRoman)

    const page = doc.addPage(PageSizes.A4)

    const logoBytes = fs.readFileSync("./lib/assets/Logo.png")
    const logoImage = await doc.embedPng(logoBytes)

    defaultPage(page, logoImage, leftSideStartPix)

    generateBanner(page)
    generateDetailSection(page, doc, logoImage)
    generateBalance(page)
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

function generateBanner(page: PDFPage) {
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

    page.drawText("MAJ 2024", {
        x: leftSideStartPix,
        y: page.getHeight() - 172,
        size: 8,
        color: rgb(1, 1, 1),
    })

    page.drawText("01/05/2024 - 30/05/2024", {
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
    page.drawText("30/05/2024", {
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
    page.drawText("10.000,47 kr", {
        x: page.getWidth() - 110,
        y: page.getHeight() - 180,
        size: 14,
        color: rgb(1, 1, 1),
    })
}

function generateDetailSection(page: PDFPage, doc: PDFDocument, logoImage: PDFImage, detailsLines: Array<IDetailLine> = [{ a: "Arbejdstimer", b: "137,0", c: "2.5 %", d: "10.000,00" }]) {
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

    detailsLines.forEach((line) => {
        if (checkIfDetailsIsFull(currentPage.getHeight() - 250 - newIndex * 10)) {
            newIndex = 0
            currentPage = doc.addPage(PageSizes.A4)
            defaultPage(currentPage, logoImage, leftSideStartPix)
            newIndex++
        }
        generateDetailLine(currentPage, line, newIndex)
    })
}

function generateDetailLine(page: PDFPage, line: IDetailLine, index: number) {
    page.drawText("0001", {
        x: leftSideStartPix,
        y: page.getHeight() - 250 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(line.a, {
        x: leftSideStartPix + 30,
        y: page.getHeight() - 250 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(line.b, {
        x: page.getWidth() / 2 - 50,
        y: page.getHeight() - 250 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(line.c, {
        x: page.getWidth() / 2 + 100,
        y: page.getHeight() - 250 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(line.d, {
        x: page.getWidth() - 100,
        y: page.getHeight() - 250 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })
}

function generateBalance(page: PDFPage) {
    page.drawLine({
        start: { x: 0, y: 200 },
        end: { x: page.getWidth(), y: 200 },
        thickness: 1,
        opacity: 0.5,
        color: rgb(0, 0, 0),
    })
    generateBalanceHoliday(page, [{ name: "Ferie", optionOne: "Ferie", optionTwo: "Ferie", optionThree: "Ferie", holidayLines: [{ name: "Ferie", optionOneValue: "10", optionTwoValue: "10", optionThreeValue: "10" }] }])
    generateBalanceSaldi(page)
}

function generateBalanceHoliday(page: PDFPage, holidays: Array<IHoliday>) {
    let titelYCord = page.getHeight() - 670
    holidays.forEach((holiday) => {
        generateFooterLineTitel(page, holiday, titelYCord)
        holiday.holidayLines.forEach((line, index) => {
            generateFooterLine(page, line, index)
            titelYCord = page.getHeight() - 670 - index * 10
        })
    })
}

function generateFooterLineTitel(page: PDFPage, holiday: IHoliday, yCord: number) {
    page.drawText(holiday.name, {
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

function generateFooterLine(page: PDFPage, line: IHolidayLine, index: number) {
    page.drawText(line.name, {
        x: leftSideStartPix,
        y: page.getHeight() - 680 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })

    if (line.optionOneValue) {
        page.drawText(line.optionOneValue, {
            x: leftSideStartPix + 90 * 1,
            y: page.getHeight() - 680 - index * 10,
            size: 8,
            color: rgb(0, 0, 0),
        })
    }

    if (line.optionTwoValue) {
        page.drawText(line.optionTwoValue, {
            x: leftSideStartPix + 90 * 1.7,
            y: page.getHeight() - 680 - index * 10,
            size: 8,
            color: rgb(0, 0, 0),
        })
    }

    if (line.optionThreeValue) {
        page.drawText(line.optionThreeValue, {
            x: leftSideStartPix + 90 * 2.45,
            y: page.getHeight() - 680 - index * 10,
            size: 8,
            color: rgb(0, 0, 0),
        })
    }
}

function generateBalanceSaldi(page: PDFPage, saldiLines: Array<ISaldiLine> = [{ a: "Ferie", b: "10" }]) {
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

function generateBalanceSaldiLine(page: PDFPage, line: ISaldiLine, index: number) {
    page.drawText(line.a, {
        x: page.getWidth() - 200,
        y: page.getHeight() - 680 - index * 10,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(line.b, {
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
