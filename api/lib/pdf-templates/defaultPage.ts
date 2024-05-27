import { PDFPage, rgb, PDFImage } from 'pdf-lib'


export function defaultPage(page: PDFPage, logo: PDFImage, xStartPix: number) {
    // Employee Information
    page.drawText("NAME", {
        x: xStartPix,
        y: page.getHeight() - 30,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("ADDRESS", {
        x: xStartPix,
        y: page.getHeight() - 40,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("ZIP CODE", {
        x: xStartPix,
        y: page.getHeight() - 50,
        size: 8,
        color: rgb(0, 0, 0),
    })

    // Section 2 - Employee Information
    page.drawText("EMPLOYEE NUMBER", {
        x: xStartPix,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("CPR NUMBER", {
        x: xStartPix,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("HIRED DATE", {
        x: xStartPix,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("BANK ACCOUNT", {
        x: xStartPix,
        y: page.getHeight() - 100,
        size: 8,
        color: rgb(0, 0, 0),
    })

    // Section 3 - Employee Filled Information
    page.drawText("0000", {
        x: 120,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("010101-0101", {
        x: 120,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("01/02/22", {
        x: 120,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText("5556 56565656565656", {
        x: 120,
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