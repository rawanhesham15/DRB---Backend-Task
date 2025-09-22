import { check } from "express-validator";

const driverValidator = [
  check("id")
    .notEmpty().withMessage("ID is required"),

  check("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),

  check("licenseType")
    .notEmpty().withMessage("License type is required")
    .isIn(["A", "B", "C"]).withMessage("Invalid license type"),

  check("availability")
    .notEmpty().withMessage("Availability is required")
    .isBoolean().withMessage("Availability must be a boolean")
];

export default driverValidator;
