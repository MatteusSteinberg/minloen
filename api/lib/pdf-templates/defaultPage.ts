import { PDFPage, rgb, PDFImage } from 'pdf-lib'
import { ICompanyInformation, IEmployeeInformation } from './payroll'


export function defaultPage(page: PDFPage, logo: PDFImage, xStartPix: number, employee: IEmployeeInformation, company: ICompanyInformation) {
    // Employee Information
    page.drawText(employee.name, {
        x: xStartPix,
        y: page.getHeight() - 30,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(employee.address, {
        x: xStartPix,
        y: page.getHeight() - 40,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(employee.zipCode, {
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
    page.drawText(employee.employeeNumber, {
        x: 120,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(employee.cpr, {
        x: 120,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(employee.hiredDate, {
        x: 120,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(employee.bankAccount, {
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
    page.drawText(company.name, {
        x: page.getWidth() - 100,
        y: page.getHeight() - 70,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(company.address, {
        x: page.getWidth() - 100,
        y: page.getHeight() - 80,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(company.zipCode, {
        x: page.getWidth() - 100,
        y: page.getHeight() - 90,
        size: 8,
        color: rgb(0, 0, 0),
    })

    page.drawText(company.cvr, {
        x: page.getWidth() - 100,
        y: page.getHeight() - 100,
        size: 8,
        color: rgb(0, 0, 0),
    })
}