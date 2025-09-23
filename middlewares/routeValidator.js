import { check } from "express-validator";

const routeValidator = [
  check("startLocation")
    .notEmpty().withMessage("Start location is required")
    .isString().withMessage("Start location must be a string"),

  check("endLocation")
    .notEmpty().withMessage("End location is required")
    .isString().withMessage("End location must be a string"),

  check("distance")
    .notEmpty().withMessage("Distance is required")
    .isNumeric().withMessage("Distance must be a number"),

  check("estimatedTime")
    .notEmpty().withMessage("Estimated time is required")
    .isNumeric().withMessage("Estimated time must be a number"),
];

export default routeValidator;
