const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    locationX: {
      type: String,
    },
    locationY: {
      type: String,
    },
    area: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    featured: {
      type: String,
    },
    type: {
      type: String,
      require: true,
    },
    gara: {
      type: String,
    },
    images: [{ type: String, required: true }],
    owner: {
      type: String,
      required: true,
    },
    createdOn: {
      type: String,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);