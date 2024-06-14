import { PDFImage, PDFPage, rgb } from 'pdf-lib'
import { IPayrollCompanyInfo, IPayrollEmployeeInfo } from '../../../interfaces/payroll.interface'


export function defaultPage(page: PDFPage, logo: PDFImage, employee: IPayrollEmployeeInfo, company: IPayrollCompanyInfo) {
  // Employee Information
  page.drawText(employee.name, {
    x: 35,
    y: page.getHeight() - 30,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(employee.address, {
    x: 35,
    y: page.getHeight() - 40,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText(employee.zipCode, {
    x: 35,
    y: page.getHeight() - 50,
    size: 8,
    color: rgb(0, 0, 0),
  })

  // Section 2 - Employee Information
  page.drawText("Medarbejder nr.", {
    x: 35,
    y: page.getHeight() - 70,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText("CPR nr.", {
    x: 35,
    y: page.getHeight() - 80,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText("Ansættelse", {
    x: 35,
    y: page.getHeight() - 90,
    size: 8,
    color: rgb(0, 0, 0),
  })

  page.drawText("Lønkonto", {
    x: 35,
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