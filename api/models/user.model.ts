import bcrypt from "bcrypt"
import { Schema, SchemaDefinition, Types, model } from "mongoose"
import { IUser, IUserDetails } from "../../interfaces/user.interface"

const userDetailsSchema: SchemaDefinition<IUserDetails> = {
  address: { type: String, trim: true },
  amContribution: { type: Boolean },
  ATP: { type: String, trim: true },
  bankAccountNumber: { type: String, trim: true },
  bankRegistrationNumber: { type: String, trim: true },
  eIncome: {
    type: {
      enabled: { type: Boolean },
      productionUnit: { type: String },
      incomeType: { type: String }
    }
  },
  employmentDate: { type: Date },
  firstName: { type: String },
  lastName: { type: String },
  hourlyWage: { type: String },
  paymentArrangement: { type: String, trim: true },
  pension: {
    type: {
      pensionType: { type: String },
      ownContributionPercentage: { type: Number },
      ownAmount: { type: String },
      companyContributionPercentage: { type: Number },
      companyAmount: { type: String }
    }
  },
  phoneNumber: { type: String },
  position: { type: String },
  resignationDate: { type: Date },
  salary: { type: String },
  socialSecurityNumber: { type: String, trim: true },
  standardHours: { type: String, required: false },
  vacation: {
    type: {
      scheme: { type: String },
      recipient: { type: String },
      eachYear: { type: String }
    }
  },
  workerNumber: { type: String },
  workplacePension: {
    type: {
      institute: { type: String },
      agreementCode: { type: String },
      ownContributionPercentage: { type: Number },
      ownAmount: { type: String },
      companyContributionPercentage: { type: Number },
      companyAmount: { type: String }
    }
  }
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 8,
      select: false,
    },
    forgottenPassword: {
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
      expriryAt: {
        type: Date,
      },
      usedAt: {
        type: Date,
      },
    },
    activeOrganization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    organizations: {
      type: [Schema.Types.ObjectId],
      ref: "Organization",
    },
    organizationRole: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    ...userDetailsSchema
  },
  {
    timestamps: true,
  }
)

userSchema.static(
  "isEmailTaken",
  async function (
    email: string,
    excludeUserId: Types.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
  }
)

userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

const userModel = model<IUser>("User", userSchema)

export default userModel
