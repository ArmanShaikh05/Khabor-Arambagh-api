import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_APIKEY,
//   api_secret: process.env.CLOUDINARY_SECRETKEY,
// });
cloudinary.config({
  cloud_name: "armanimages",
  api_key: 986435216985328,
  api_secret: "RM_4dazYOlU7h_mC_4zFTzgO0SQ",
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder:"images"
    });
    console.log(`Image uploaded`, response.url);
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("Error in imageUpload", error);
    return null
  }
};


export const uploadPdf = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder:"newspaper",
    });
    console.log(`Newspaper uploaded`, response.url);
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("Error in imageUpload", error);
    return null
  }
};

