import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const model = mongoose.model("contacts", schema);

export default model;
