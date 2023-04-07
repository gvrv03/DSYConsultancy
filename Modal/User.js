import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    role: {
      type: String,
      default: "user",
    },
    credentails: {
      username: String,
      email: String,
      password: String,
      fName: String,
    },
    basicDetails: {
      fName: String,
      dob: {
        type: String,
        default: "N/A",
      },
      socialCategory: {
        type: String,
        default: "N/A",
      },
      maritialStatus: {
        type: String,
        default: "N/A",
      },
      phyChanged: {
        type: String,
        default: "N/A",
      },
      gender: {
        type: String,
        default: "N/A",
      },
    },
    contactDetails: {
      mobileNo: {
        type: String,
        default: "N/A",
      },
      email: String,
      city: {
        type: String,
        default: "N/A",
      },
      state: {
        type: String,
        default: "N/A",
      },
    },
    educationDetails: {
      ssc: {
        board: {
          type: String,
          default: "N/A",
        },
        school: {
          type: String,
          default: "N/A",
        },
        passingYear: {
          type: Number,
          default: 0,
        },
        markType: {
          type: String,
          default: "Percetage",
        },
        percentage: {
          type: Number,
          default: 0,
        },
      },
      diploma: {
        board: {
          type: String,
          default: "N/A",
        },
        school: {
          type: String,
          default: "N/A",
        },
        passingYear: {
          type: Number,
          default: 0,
        },
        markType: {
          type: String,
          default: "Percetage",
        },
        percentage: {
          type: Number,
          default: 0,
        },
      },
    },
    preferences: {
      university: {
        type: String,
        default: "N/A",
      },
      branch: {
        type: String,
        default: "N/A",
      },
      location: {
        type: String,
        default: "N/A",
      },
      collegeType: {
        type: String,
        default: "N/A",
      },
      needLoan: {
        type: String,
        default: "N/A",
      },
    },
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
    profileCompletion: {
      type: Number,
      default: 20,
    },
    notification: {
      SMS: {
        type: Boolean,
        default: false,
      },
      Whatsapp: {
        type: Boolean,
        default: false,
      },
      Email: {
        type: Boolean,
        default: false,
      },
    },
    subscription: {
      type: String,
      default: "Free",
    },
  },
  { timestamps: true }
);
export default mongoose.models.user || mongoose.model("user", userSchema);
