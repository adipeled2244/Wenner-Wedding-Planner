const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
// const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      
    },
    name: { type: String},
    password: { type: String },
    phone: { type: String},
    address: { type: String},
    weddingDate: { type: Date},
    weddingLocation: { type: String},
    weddingTime: { type: String},
    weddingVenue: { type: String},
    weddingVenueAddress: { type: String},
    groomName: { type: String},
    brideName: { type: String},
    img: { type: String},
    status: { type: String},
    invitation: { type: Boolean, default: false},
    checklist: [
      { label: { type: String }, checked: { type: Boolean, default: false } },
    ],
    guests: { type: Array, default: [] },  },
  { collection: "users" }
);

const User = model("User", userSchema);

module.exports = User;
