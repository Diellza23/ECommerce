import ContactModel from "../models/ContactModel";
// import updatedContactSchema from "../validator/userValidation/ContactValidation/updatedcontactSchema";

export default {
  list: async (req, res) => {
    const list = await ContactModel.find();

    return res.json(list);
  },
  get: async (req, res) => {
    const { id } = req.params;
    const foundItem = await ContactModel.findOne({ _id: id });
    return res.json(foundItem);
  },
  post: async (req, res) => {
    const contact = new ContactModel(req.body);

    await contact.save();

    return res.json(contact);
  },
};
