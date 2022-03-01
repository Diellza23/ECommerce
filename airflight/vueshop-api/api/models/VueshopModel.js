import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    category:String,
    files: String,
  },
  { typeKey: "$type" }
);

const model = mongoose.model("vueshops", schema);

export default model;
