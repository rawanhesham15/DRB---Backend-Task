import { Router } from "express";
import { addDriver, driverHistory } from "../controllers/driver.controller.js";
import driverValidator from "../middlewares/driverValidator.js";

const driverRouter = Router();

driverRouter.post("/add", driverValidator, addDriver);
driverRouter.get("/:id/history", driverHistory);


export default driverRouter;