import { Router } from "express";
import { getSchedule } from "../controllers/schedule.controller.js";

const scheduleRouter = Router();

scheduleRouter.get("/", getSchedule);

export default scheduleRouter;