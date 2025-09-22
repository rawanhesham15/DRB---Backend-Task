import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    licenseType: { type: String, required: true },
    availability: { type: Boolean, required: true }
});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;