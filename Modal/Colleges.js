import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const collegeSchema = new Schema({
  name: String,
  instituteCode: Number,
  iframe: String,
  addedBy: String,
  collegeUnder: String,
  collegeType: String,
  university: String,
  images: [
    {
      type: String,
    },
  ],
  views: {
    type: Number,
    default: 1,
  },
  department: [
    {
      courseName: String,
      annalFee: Number,
      choiceCode: Number,
      cName: String,
      categories: [
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
        },
      ],
    },
  ],

  location: {
    addressLine: String,
    taluka: String,
    district: String,
    city: String,
    latitude: String,
    longitude: String,
  },
  rating: Number,
  contacts: {
    contactNo: Number,
    website: String,
    email: String,
  },
  approvedBy: String,
  image: String,
  topRecruiters: String,
  fullDescription: {
    type: String,
    default: " ",
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models.college ||
  mongoose.model("college", collegeSchema);
