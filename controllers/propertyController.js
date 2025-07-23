const Property = require("../models/BatDongSan");
const NguoiDung = require("../models/nguoidung");

const propertyController = {
  // GET property
  getAllProperty: async (req, res) => {
    try {
      const propertiesList = await Property.find().populate("nguoiDungId");
      return res.status(200).json({
        message: "Get all property succesfully ",
        properties: propertiesList,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  // GET property by id
  getPropertyById: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const propertyDetails = await Property.findById(propertyId).populate(
        "nguoiDungId"
      );
      if (!propertyDetails)
        return res.status(404).json({ message: "Property not found" });
      return res
        .status(200)
        .json({ message: "Property found", propertyData: propertyDetails });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  // POST create property
  createProperty: async (req, res) => {
    try {
      const userData = await NguoiDung.findById(req.body.nguoiDungId);
      if (!userData) return res.status(404).json({ message: "User not found" });
      const newPropertyData = new Property(req.body);
      const createdProperty = await newPropertyData.save();
      return res
        .status(201)
        .json({ message: "Property created", savedProperty: createdProperty });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  // PUT update property
  updateProperty: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const updatedPropertyData = await Property.findByIdAndUpdate(
        propertyId,
        req.body,
        { new: true }
      );
      if (!updatedPropertyData)
        return res.status(404).json({ message: "Property not found" });
      return res
        .status(200)
        .json({ message: "update property", updatedPropertyData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  // DELETE property
  deleteProperty: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const deletedPropertyData = await Property.findByIdAndDelete(propertyId);
      if (!deletedPropertyData)
        return res.status(404).json({ message: "Property not found" });
      return res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getPropertiesByDistrict: async (req, res) => {
    try {
      const { district } = req.params;
      const propertiesList = await Property.find({
        quanHuyen: { $regex: new RegExp(district, "i") },
      }).populate("nguoiDungId");
      if (!propertiesList || propertiesList.length === 0)
        return res.status(404).json({ message: "Property not found" });
      return res.status(200).json({
        message: "Get property by district successfully",
        properties: propertiesList,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = propertyController;
