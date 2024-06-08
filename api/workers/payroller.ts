import "dotenv/config"
import { HydratedDocument } from "mongoose"
import { IUser } from "../../interfaces/user.interface"
import { connect } from "../lib/db"
import payrollSetupModel from "../models/payroll-setup.model"
import userModel from "../models/user.model"
import { generatePayrollPDF } from "../services/utils/payroll.utils"


const run = async () => {
  await connect()

  const cursor = userModel.find({ organizationRole: "user" }).cursor()

  await cursor.forEach(async (user: HydratedDocument<IUser>) => {
    const fixedPayroll = await payrollSetupModel.findOne({
      user: user,
      organization: user.activeOrganization,
      fixed: true
    })
    const nonFixedPayroll = await payrollSetupModel.findOne({
      user: user,
      organization: user.activeOrganization,
      fixed: { $ne: true }
    })

    const payrollSetup = nonFixedPayroll || fixedPayroll

    if (!payrollSetup) {
      return
    }

    await generatePayrollPDF(user, payrollSetup)
  })
    .catch(err => {
      console.error(err)
    })

}

run().catch(console.error)