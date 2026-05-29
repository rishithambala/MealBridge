import mongoose from "mongoose"

const donationSchema = mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    foodType: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: String,
      required: true,
      trim: true,
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },

    donorPhone: {
      type: String,
      default: "",
    },

    donorAddress: {
      type: String,
      default: "",
    },

    deliveryNotes: {
      type: String,
      default: "",
    },

    foodImages: [
      {
        type: String,
      },
    ],

    expiryHours: {
      type: Number,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Volunteer Assigned",
        "Picked Up",
        "Delivered",
        "Completed",
      ],
      default: "Pending",
    },

    pickedUpAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Donation = mongoose.model(
  "Donation",
  donationSchema
)

export default Donation