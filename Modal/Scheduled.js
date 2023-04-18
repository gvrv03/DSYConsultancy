import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const scheduleSchema = new Schema(
  {
    name: String,
    scheduleTime: String,
    scheduleFor: String,
    scheduleDate: Date,
    user: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.schedule ||
  mongoose.model("schedule", scheduleSchema);
