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

async function driverHistory(req, res){
    const { id } = req.params;
    try{
        const driver = await Driver.findOne({ id }).populate(
            { 
                path: "history.route",
                select: "startLocation endLocation distance estimatedTime -_id"
            }
        );
        if(!driver){
            return res.status(404).json({ status: FAIL, message: "Driver not found" });
        }
        const history = driver.history.map(h => ({
            startLocation: h.route.startLocation,
            endLocation: h.route.endLocation,
            distance: h.route.distance,
            completionTime: h.completedAt
        }));
        res.status(200).json({ status: SUCCESS, data: history });
    }catch(err){
        res.status(500).json({ status: ERROR, message: "Failed to retrieve driver history", error: err });
    }

}

export { addDriver, driverHistory };