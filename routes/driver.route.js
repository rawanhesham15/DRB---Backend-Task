import { Router } from "express";
import { addDriver } from "../controllers/driver.controller.js";
import driverValidator from "../middlewares/driverValidator.js";

const driverRouter = Router();

driverRouter.post("/add", driverValidator, addDriver);


export default driverRouter;