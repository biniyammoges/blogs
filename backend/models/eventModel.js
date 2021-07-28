const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    image: {
      type: string,
      default: "no-event-image.png",
    },
    cover: {
      type: string,
      default: "no-event-cover.png",
    },
    startDate: {
      type: Date,
      required: [true, "Please set start date"],
    },
    startTime: {
      type: Date,
      required: [true, "Please set start time"],
    },
    endDate: {
      type: Date,
      required: [true, "Please set end date"],
    },
    endTime: {
      type: Date,
      required: [true, "Please set end time"],
    },
    location: {
      address: String,
      link: String,
    },
    isExpired: {
      type: Boolean,
      default: fale,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", eventSchema);
module.exports = Feedback;
