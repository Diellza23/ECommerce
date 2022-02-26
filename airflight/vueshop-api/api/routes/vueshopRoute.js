import express from "express";
import checkIfAuthenticated from "../middleware/checkIfAuthenticated";
import vueshopController from "../controllers/vueshopController";

const vueshopRoute = express.Router();

//vueshopRoute.use(checkIfAuthenticated);

vueshopRoute.get("/list", vueshopController.list);
vueshopRoute.get("/:id", vueshopController.get);
vueshopRoute.post("/create", vueshopController.post);
vueshopRoute.put("/update", vueshopController.put);

export default vueshopRoute;
