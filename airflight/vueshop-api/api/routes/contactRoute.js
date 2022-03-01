import express from "express";
import contactController from "../controllers/contactController";

const contactRoute = express.Router();

contactRoute.get("/list", contactController.list);
contactRoute.get("/:id", contactController.get);
contactRoute.post("/create", contactController.post);

export default contactRoute;
