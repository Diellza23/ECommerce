import express from "express";
import checkIfAuthenticated from "../middleware/checkIfAuthenticated";
import vueshopController from "../controllers/vueshopController";

const vueshopRoute = express.Router();

//vueshopRoute.use(checkIfAuthenticated);

vueshopRoute.get("/list", vueshopController.list);
vueshopRoute.get("/:id", vueshopController.get);
vueshopRoute.post("/create", vueshopController.post);
vueshopRoute.put("/update", vueshopController.put);
vueshopRoute.put("/:id/uploadFile", vueshopController.uploadFile);
vueshopRoute.put(
  "/:vueshopId/removeFile/:filename",
  vueshopController.deleteFile
);
export default vueshopRoute;
