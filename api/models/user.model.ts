import bcrypt from "bcrypt"
import { Schema, Types, model } from "mongoose"
import { IUserDoc, IUserModel } from "../interfaces/user.interface"

const userSchema = new Schema<IUserDoc, IUserModel>(
  {
    name: {
      type: String,
      trim: true,
      index: true,
      required: true,
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
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
    },
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
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const userModel = model<IUserModel>("User", userSchema)

export default userModel
