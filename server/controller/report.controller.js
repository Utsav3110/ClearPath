// report.controller.js
import { Report } from "../model/report.model.js";


// Create a new report
const createReport = async (req, res) => {
    try {
      const { description, location } = req.body;
  
      // Validation checks
      if (!description || !location || !location.coordinates || location.coordinates.length !== 2) {
        return res.status(400).json({ message: "All fields are required and location coordinates must be [longitude, latitude]." });
      }
  
      // Destructure coordinates to validate as [longitude, latitude]
      const [longitude, latitude] = location.coordinates;
      if (typeof longitude !== "number" || typeof latitude !== "number") {
        return res.status(400).json({ message: "Coordinates must be numbers representing [longitude, latitude]." });
      }
  
      // Create and save the new report
      const newReport = await Report.create({
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        description,
        reportedBy: req.user._id
      });
  
      // Return the created report without unneeded fields
      const createdReport = await Report.findById(newReport._id).select("-__v");
  
      return res.status(201).json({
        message: "Report created successfully",
        report: createdReport
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong while creating the report",
        error: error.message
      });
    }
  };




const allReports = async (req, res) =>{
  try {
    const reports = await Report.find(); 
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports', error });
  }
};
  

export { createReport , allReports};
