import mongoose from "mongoose";

const schema = mongoose.Schema({
  type: String,
  rooms: Number,
  squareMeters: Number,
  price: Number,
});

const model = mongoose.model("vueshops", schema);

export default model;
