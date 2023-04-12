import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    Category: String,
  },
  { timestamps: true }
);
export default mongoose.models.CollegeCategory ||
  mongoose.model("CollegeCategory", userSchema);
