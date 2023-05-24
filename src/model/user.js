import mongoose from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const password = this.password;
    const saltRounds = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log("error in prehook save");
    throw { error };
  }
});

export const User = mongoose.model("User", userSchema);
