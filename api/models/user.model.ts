import bcrypt from "bcrypt"
import { Schema, Types, model } from "mongoose"
import { IUser } from "../../interfaces/user.interface"

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
    }
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
