import mongoose, { models } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    issueName: String,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.models.ReportIssue ||
  mongoose.model("ReportIssue", reportSchema);
