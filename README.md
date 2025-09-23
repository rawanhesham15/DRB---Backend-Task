# DRB Route Scheduling System

A simple **REST API** built with **Node.js**, **Express**, and **MongoDB** for managing drivers, routes, and schedules.  

---

## 🚀 Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/rawanhesham15/DRB---Backend-Task.git
   cd DRB---Backend-Task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root and add the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.rfjxi.mongodb.net/drb_scheduler?retryWrites=true&w=majority
   ```

   Replace `<username>` and `<password>` with your **MongoDB Atlas** credentials.

4. **Run the server**

   ```bash
   npm start
   ```

   The server will be available at: [http://localhost:5000](http://localhost:5000)

---

## 📌 API Endpoints

### Drivers
- **POST** `/drivers/add`  
  Adds a new driver.  
  **Payload**:
  ```json
  {
    "id": "1",
    "name": "Rawam",
    "licenseType": "A",
    "availability": true
  }
  ```

- **GET** `/drivers/:id/history`  
  Retrieves the completed routes history for a specific driver.

### Routes
- **POST** `/routes/add`  
  Adds a new route.  
  **Payload**:
  ```json
  {
    "startLocation": "Cairo",
    "endLocation": "Alex",
    "distance": 200,
    "estimatedTime": 180
  }
  ```

- **PATCH** `/routes/:id/completed`  
  Marks a route as completed (called by the driver).
  
- **GET** `/routes?page=1&limit=5`  
  Returns all routes and to avoid returning all routes at once, pagination was added.


### Schedule
- **GET** `/schedule`  
  Displays all active routes and their assigned drivers.

---

## 🧠 Business Logic

- **Single Route Assignment**: Each driver can be assigned to only one active route at a time.
- **Driver Availability**: Drivers are assigned routes only if their `availability` is `true`.
- **Unassigned Routes**: If no drivers are available, routes remain unassigned.
- **Route Completion**:
  - Updates route `status` to `completed`.
  - Sets driver `availability` to `true`.
  - Adds the completed route to the driver’s history.

---

## ✨ Features Implemented

- Add drivers and routes.
- Automatic driver assignment based on availability.
- Route completion flow (driver-initiated).
- Driver history tracking.
- Efficient data population with field selection (`startLocation`, `endLocation`, `status`).
- Modular project structure with separate routes, controllers, and utilities.

---

## 📌 Assumptions Made

- Drivers manually mark routes as completed via the `routes/completed` endpoint.
- Drivers are assigned automatically to an unassigned route where they are available.
- Route `estimatedTime` and `distance` is stored but not automatically monitored, I supposed they are only useful for the client who ordered the trip.
- Used _id in driver document as the database primary key, although there is an id in the payload i assumed it is like a “business identifier” (like driver’s license number or company-assigned ID).
- - The database uses **MongoDB Atlas** by default, but can be configured to run locally with a MongoDB instance by setting `MONGO_URI=mongodb://localhost:27017/...` in the `.env` file.
- When a driver completes a route, we automatically set availability = true so they can take new routes (assumes no cooldown period).
- The first available driver is assigned to a route (ofcourse it is preferable to implement more advanced logic like nearest one, and load balancing)

---
