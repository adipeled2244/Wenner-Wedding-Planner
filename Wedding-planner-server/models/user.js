const { Schema, model, Types } = require("mongoose");
const mongoose = require("mongoose");
// const validator = require("validator");

// const guestSchema = new Schema({
//   id: {
//     type: Schema.Types.ObjectId,
//     default: function () {
//       return new Schema.Types.ObjectId();
//     },
//   },
//   name: { type: String },
//   email: { type: String },
//   phone: { type: String },
//   address: { type: String },
//   invitation: { type: Boolean, default: true },
//   table: { type: Number },
//   seat: { type: Number },
//   side: { type: String },
//   group: { type: String },
//   attending: { type: String },
//   status: { type: String },
// });


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

    checklist: [
      { label: { type: String }, checked: { type: Boolean, default: false } },
    ],
    guests:[
      {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        invitation: { type: Boolean, default: false },
        table: { type: Number },
        seat: { type: Number },
        side: { type: String },
        group: { type: String },
        attending: { type: Number ,default: 0  },
        status: { type: String },
      }

    ],
      
  },
  { collection: "users" }
);

const User = model("User", userSchema);

module.exports = User;

       
       
       