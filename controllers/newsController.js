import { uploadOnCloudinary } from "../middlewares/cloudinary.js";
import ErrorHandler from "../middlewares/error.js";
import { news } from "../models/newsModel.js";
import { v2 as cloudinary } from "cloudinary";

// CREATE NEWS POST

export const createNews = async (req, res, next) => {
  try {
    const { title, summary, content, category, section } = req.body;
    const file = req.file;

    const response = await uploadOnCloudinary(file.path);

    await news.create({
      title,
      summary,
      content,
      category,
      section,
      image: {
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
      success:false,
      message: error.message
    })
    next(new ErrorHandler(error.message, 500));
  }
};

// SHOW ALL THE NEWS IN DATABASE

export const showAllNews = async (req, res, next) => {
  const search = req.query.search ? req.query.search : "";
  const limit = req.query.limit ? req.query.limit : null;
  const section = req.query.section ? req.query.section : "";
  const category = req.query.category ? req.query.category : "";

  const searchFilter = {
    section: { $regex: section, $options: "i" },
    category: { $regex: category, $options: "i" },
    title: { $regex: search, $options: "i" },
  };

  try {
    const postsData = await news
      .find(searchFilter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    if (!postsData) return next(new ErrorHandler("No News Found", 404));

    res.json(postsData);
  } catch (error) {
    res.json({
      success:false,
      message: error.message
    })
    next(new ErrorHandler(error.message, 500));
  }
};

// SHOW SPECIFIC NEWS DATA

export const getSpecificData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const specificData = await news.findById(id);

    if (!specificData) return next(new ErrorHandler("News Not Found", 404));
    res.json(specificData);
  } catch (error) {
    res.json({
      success:false,
      message: error.message
    })
    next(new ErrorHandler(error.message, 500));
  }
};

// UPDATE NEWS DATA

export const updateNewsData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, summary, content, category, section } = req.body;
    const file = req.file;

    const newsDoc = await news.findById(id);
    if (!newsDoc) return next(new ErrorHandler("News Not Found", 404));

    if (file) {
     const response = await uploadOnCloudinary(file.path);
      const { public_id } = newsDoc.image;
      cloudinary.uploader.destroy(public_id);
      await newsDoc.updateOne({
        image: {
          url: response.secure_url,
          public_id: response.public_id,
        },
      });
    }

    await newsDoc.updateOne({
      title,
      summary,
      content,
      category,
      section,
    });

    res.status(200).json({
      success: true,
      message: "News Updated Successfully",
    });
  } catch (error) {
    res.json({
      success:false,
      message: error.message
    })
    next(new ErrorHandler(error.message, 500));
  }
};

// DELETE A SPECIFIC NEWS

export const deleteNews = async (req, res, next) => {
  try {
    const deleteNews = await news.findByIdAndDelete(req.params.id);
    if (!deleteNews) return next(new ErrorHandler("News Not Found", 404));

    const { public_id } = deleteNews.image;
    cloudinary.uploader.destroy(public_id);


    res.status(200).json({
      success: true,
      data: `News deleted successfully`,
    });
  } catch (error) {
    res.json({
      success:false,
      message: error.message
    })
    next(new ErrorHandler(error.message, 500));
  }
};

//SHOW NEWS BY CATEGORY

export const showCategoryNews = async (req, res, next) => {
  try {
    const query = req.query;
    const limit = req.query.limit ? req.query.limit : null;

    const searchFilter = {
      category: { $regex: query.category, $options: "i" },
    };

    const postsData = await news
      .find(searchFilter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    if (!postsData) return next(new ErrorHandler("No News Found", 404));

    res.json(postsData);
  } catch (error) {
    res.json({
      success:false,
      message: error.message
    })
    next(new ErrorHandler(error.message, 500));
  }
};
