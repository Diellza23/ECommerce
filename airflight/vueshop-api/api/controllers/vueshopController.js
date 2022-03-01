//import database from "../utility/database";
import FileService from "../../../src/services/FileService";
import VueshopModel from "../models/VueshopModel";
import updatedVueshopSchema from "../validator/userValidation/vueshopValidation/updateVueshopSchema";

export default {
  list: async (req, res) => {
    //ne postman vueshop/get
    const list = await VueshopModel.find();

    return res.json(list);
  },
  get: async (req, res) => {
    //  /:id
    const { id } = req.params;
    const foundItem = await VueshopModel.findOne({ _id: id });
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

    return res.json(updatedVueshop);
  },

  uploadFile: async (req, res) => {
    const { id } = req.params;
    const receivedFiles = [req.files.file];

    try {
      const files = await FileService.uploadFiles(receivedFiles);

      console.log("files - ", files);

      const vueshop = await VueshopModel.find({ _id: id }, { files: 1 });
      const oldFiles = vueshop.files;

      const newFiles = `${oldFiles || ""}${oldFiles ? ";" : ""}${files}`;

      await VueshopModel.updateOne({ _id: id }, [
        {
          $set: { files: newFiles },
        },
      ]);

      const updatedVueshop = await VueshopModel.find({ _id: id });

      return res.json(updatedVueshop);
    } catch (err) {
      res.status(500).json({ err: err.toString() });
    }
  },

  deleteFile: async (req, res) => {
    const { vueshopId, filename } = req.params;

    FileService.deleteFiles([filename]);

    const vueshopData = await VueshopModel.findOne(
      { _id: vueshopId },
      { files: 1 }
    );

    const updatedFilenames = vueshopData.files
      .replace(`${filename}; `, "")
      .replace(filename, "");

    await VueshopModel.updateOne(
      { _id: vueshopId },
      {
        files: updatedFilenames,
      }
    );

    const updatedVueshop = await VueshopModel.findOne(
      { _id: vueshopId },
      {
        files: updatedFilenames,
      }
    );

    return res.json(updatedVueshop);
  },
};
