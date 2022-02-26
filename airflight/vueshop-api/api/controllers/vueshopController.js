//import database from "../utility/database";
import VueshopModel from "../models/VueshopModel";
import updatedVueshopSchema from "../validator/userValidation/vueshopValidation/updateVueshopSchema";

export default {
  list: async (req, res) => {
    //ne postman vueshop/get
    const list = await VueshopModel.find();

    //database.collection("vueshop").list();

    return res.json(list);
  },
  get: async (req, res) => {
    //  /:id
    const { id } = req.params;
    const foundItem = await VueshopModel.findOne({ _id: id });
    //database.collection("vueshop").findOne(id);
    return res.json(foundItem);
  },
  post: async (req, res) => {
    const vueshop = new VueshopModel(req.body);

    await vueshop.save();

    return res.json(vueshop);
  },
  put: async (req, res) => {
    const vueshop = req.body;

    const validationResult = updatedVueshopSchema.validate(vueshop);

    if (validationResult.error) {
      return res
        .status(401)
        .json({ message: "Validation failed", error: validationResult.error });
    }
    await VueshopModel.updateOne({ _id: vueshop._id }, vueshop);

    const updatedVueshop = await VueshopModel.find({ _id: vueshop._id });
    //database.collection("vueshop").update(vueshop);

    return res.json(updatedVueshop);
  },
};
