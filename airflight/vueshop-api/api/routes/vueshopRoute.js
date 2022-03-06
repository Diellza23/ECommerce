import express from "express";
import vueshopController from "../controllers/vueshopController";

const vueshopRoute = express.Router();

vueshopRoute.get("/list", vueshopController.list);
vueshopRoute.get("/:id", vueshopController.get);
vueshopRoute.post("/create", vueshopController.post);
vueshopRoute.put("/update", vueshopController.put);
vueshopRoute.put("/:id/uploadFile", vueshopController.uploadFile);
vueshopRoute.put(
  "/:vueshopId/removeFile/:filename",
  vueshopController.deleteFile
);
vueshopRoute.delete("/delete/:id",vueshopController.deleteMethod);
vueshopRoute.put("/put/:id", vueshopController.updateMethod);
export default vueshopRoute;
