import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uName: String,
    phoneNo: Number,
    email: String,
    message: String,
  },
  { timestamps: true }
);
export default mongoose.models.contact || mongoose.model("contact", userSchema);
