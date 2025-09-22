import express from "express";
import dotenv from "dotenv";
import driverRouter from "./routes/driver.route.js";
import connectDB from "./utils/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/drivers", driverRouter);

app.listen(PORT, async ()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});