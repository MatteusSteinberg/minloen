import fs from "fs"
import { PDFDocument, PDFImage, PDFPage, StandardFonts, rgb } from "pdf-lib"

const leftSideStartPix = 35
const leftSideDataPix = 120

export async function payrollPdfTemplate(data?: object) {
    const doc = await PDFDocument.create()

    await doc.embedFont(StandardFonts.TimesRoman)

    const page = doc.addPage()

    const logoBytes = fs.readFileSync("./lib/assets/Logo.png")
    const logoImage = await doc.embedPng(logoBytes)

    generateHeader(page, logoImage)
    generateBanner(page)
    generateDetailSection(page)
    generateDetailLine(page)
    generateBalance(page)
    generateFooter(page)

    return doc.save()
}

function generateHeader(page: PDFPage, logo: PDFImage) {
    // Employee Information
    page.drawText("NAME", {
        x: leftSideStartPix,
        y: page.getHeight() - 30,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("ADDRESS", {
        x: leftSideStartPix,
        y: page.getHeight() - 40,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("ZIP CODE", {
        x: leftSideStartPix,
        y: page.getHeight() - 50,
        size: 8,
        color: rgb(0, 0, 0),
    })

    // Section 2 - Employee Information
    page.drawText("EMPLOYEE NUMBER", {
        x: leftSideStartPix,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("CPR NUMBER", {
        x: leftSideStartPix,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("HIRED DATE", {
        x: leftSideStartPix,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("BANK ACCOUNT", {
        x: leftSideStartPix,
        y: page.getHeight() - 100,
        size: 8,
        color: rgb(0, 0, 0),
    })

    // Section 3 - Employee Filled Information
    page.drawText("0000", {
        x: leftSideDataPix,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("010101-0101", {
        x: leftSideDataPix,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("01/02/22", {
        x: leftSideDataPix,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("5556 56565656565656", {
        x: leftSideDataPix,
        y: page.getHeight() - 100,
        size: 8,
        color: rgb(0, 0, 0),
    })

    // Logo
    const { width, height } = logo.scale(0.5)

    page.drawImage(logo, {
        x: page.getWidth() - 120,
        y: page.getHeight() - 45,
        width: width,
        height: height,
    })

    // Company Information
    page.drawText("COMPANY NAME", {
        x: page.getWidth() - 100,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("ADDRESS", {
        x: page.getWidth() - 100,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("ZIP CODE", {
        x: page.getWidth() - 100,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("CVR NUMBER", {
        x: page.getWidth() - 100,
        y: page.getHeight() - 100,
        size: 8,
        color: rgb(0, 0, 0),
    })
}

function generateBanner(page: PDFPage) {
    // Banner
    page.drawRectangle({
        x: 0,
        y: page.getHeight() - 200,
        width: page.getWidth(),
        height: 65,
        color: rgb(0.36, 0.4, 0.51),
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

function generateDetailSection(page: PDFPage) {
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
}

function generateDetailLine(page: PDFPage) {
    page.drawText("0001", {
        x: leftSideStartPix,
        y: page.getHeight() - 250,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("Arbejdstimer", {
        x: leftSideStartPix + 30,
        y: page.getHeight() - 250,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("137,0", {
        x: page.getWidth() / 2 - 50,
        y: page.getHeight() - 250,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("2.5 %", {
        x: page.getWidth() / 2 + 100,
        y: page.getHeight() - 250,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("10.000,00", {
        x: page.getWidth() - 100,
        y: page.getHeight() - 250,
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
