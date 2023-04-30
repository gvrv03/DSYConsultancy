import mongoose, { models } from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const feedbackSchema = new Schema(
  {
    uName: String,
    message: String,
    User: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export default mongoose.models.feedback ||
  mongoose.model("feedback", feedbackSchema);
