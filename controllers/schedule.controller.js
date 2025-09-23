import Driver from "../models/Drivers.js";
import Route from "../models/Routes.js";
import { SUCCESS, ERROR } from "../utils/httpStatus.js";

async function getSchedule(req, res) {
  try {
    const routes = await Route.find().populate("assignedDriver");
    for (let route of routes) {
      if (!route.assignedDriver && route.status === "unassigned") {
        const assignedDrivers = await Route.find({ status: "active" }).distinct("assignedDriver");
        const driver = await Driver.findOne({
          availability: true,
          _id: { $nin: assignedDrivers },
        });

        if (driver) {
          route.assignedDriver = driver._id;
          route.status = "active";
          await route.save();

          driver.availability = false;
          await driver.save();
        }
      }
    }
    const schedule = await Route.find({}, {__v: 0}).populate("assignedDriver", "id name licenseType -_id");
    res.status(200).json({ status: SUCCESS, data: schedule });
  } catch (err) {
    res.status(500).json({ status: ERROR, message: err.message });
  }
}

export { getSchedule };
