import { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    phone: String,
    address: String,
    lat: Number,
    long: Number,
    email: {
      type: String,
      unique: true,
    },
    description: String,
    reviews: Array,
    category: String,
    imgProfile: String,
    imgBanner: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Company", companySchema);
