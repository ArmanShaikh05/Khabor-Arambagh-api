import { uploadPdf } from "../middlewares/cloudinary.js";
import ErrorHandler from "../middlewares/error.js";
import { newspaper } from "../models/newspaperModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// CREATE NEWSPAPER

export const createNewspaper = async (req, res, next) => {
  try {
    const { title } = req.body;
    const response = await uploadPdf(req.file.path);

    await newspaper.create({
      title,
      newspaper: {
        url: response.secure_url,
        public_id: response.public_id,
      },
    });
    res.json({
      success: true,
      message: "News Created Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    next(new ErrorHandler(error.message, 500));
  }
};

// SHOW ALL THE NEWSPAPERS

export const getNewspapers = async (req, res, next) => {
  try {
    const newspapers = await newspaper.find().sort({ createdAt: -1 });
    res.status(200).json(newspapers);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 400));
  }
};

// DELETE THE NEWSPAPERS

export const deleteNewpaper = async (req, res, next) => {
  try {
    const deleteNewpaper = await newspaper.findByIdAndDelete(req.params.id);

    if (!deleteNewpaper) return next(new ErrorHandler("News Not Found", 404));

    const { public_id } = deleteNewpaper.newspaper;
    cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      success: true,
      data: `Newspaper deleted successfully`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    next(new ErrorHandler(error.message, 500));
  }
};

// SHOW SPECIFIC NEWSPAPER

export const getSpecificNewspaper = async (req, res, next) => {
  try {
    const id = req.params.id;
    const specificData = await newspaper.findById(id);

    if (!specificData) return next(new ErrorHandler("News Not Found", 404));
    res.json(specificData);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
