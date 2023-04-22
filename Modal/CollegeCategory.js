import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const categorySchema = new Schema(
  {
    category: {
      type: String,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    aFees: {
      type: Number,
    },
    aSeats: {
      type: Number,
    },
    CollegeDetails: {
      type: ObjectId,
      ref: "college",
    },
    CollegeDepartment: {
      type: ObjectId,
      ref: "collegedepartment",
    },
  },
  { timestamps: true }
);
export default mongoose.models.CollegeCategory ||
  mongoose.model("CollegeCategory", categorySchema);
