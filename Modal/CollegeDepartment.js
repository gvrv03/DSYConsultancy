import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const departmentSchema = new Schema(
  {
    courseName: String,
    CollegeDetails: {
      type: ObjectId,
      ref: "college",
    },
    annalFee: Number,
    choiceCode: Number,
    cName: String,
    DepCategory: [{ type: ObjectId, ref: "CollegeCategory" }],
  },
  { timestamps: true }
);

export default mongoose.models.collegedepartment ||
  mongoose.model("collegedepartment", departmentSchema);
