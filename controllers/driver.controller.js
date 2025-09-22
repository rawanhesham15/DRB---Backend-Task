import { validationResult } from "express-validator";
import { SUCCESS, ERROR, FAIL } from "../utils/httpStatus.js";
import Driver from "../models/Drivers.js";

async function addDriver(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status:FAIL, message: "Validation failed", error: errors.array() });
    }
    const {id, name, licenseType, availability} = req.body;
    try{
        const newDriver = new Driver({id, name, licenseType, availability});
        await newDriver.save()
        res.status(201).json({ status: SUCCESS, data: newDriver });
    } catch (err) {
        res.status(500).json({ status: ERROR, message: "Failed to add driver", error: err });
    }
}

export { addDriver };