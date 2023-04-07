import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uName: String,
    phoneNo: Number,
    email: String,
    message: String,
    coOrdinates: {
      longitude: {
        type: String,
        default: "00.0000",
      },
      latitude: {
        type: String,
        default: "00.0000",
      },
    },
  },
  { timestamps: true }
);
export default mongoose.models.contact || mongoose.model("contact", userSchema);
