import { Router } from "express";
import { addRoute, completeRoute, getAllRoutes } from "../controllers/route.controller.js";
import routeValidator from "../middlewares/routeValidator.js";

const routeRouter = Router();

routeRouter.get("/", getAllRoutes);
routeRouter.post("/add", routeValidator, addRoute);
routeRouter.post("/:id/completed", completeRoute);

export default routeRouter;