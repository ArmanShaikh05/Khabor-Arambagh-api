import ErrorHandler from "../middlewares/error.js";
import { newspaper } from "../models/newspaperModel.js";
import fs from 'fs'



// CREATE NEWSPAPER

export const createNewspaper = async(req,res,next) => {
    try {
        const { title} = req.body;
        let newPath = req.file.path;
    
        await newspaper.create({
          title,
          newspaper: newPath,
        });
        res.json({
          success: true,
          message: "News Created Successfully",
        });
      } catch (error) {
        next(new ErrorHandler(error.message, 500));
      }
}


// SHOW ALL THE NEWSPAPERS

export const getNewspapers = async (req, res, next) =>{
    try{
       const newspapers=await newspaper.find().sort({createdAt:-1});
       res.status(200).json(newspapers);
    }catch(err){
        console.log(err)
        next(new ErrorHandler(err.message,400))
    }
}



// DELETE THE NEWSPAPERS

export const deleteNewpaper = async (req, res, next) => {
  try {
    const deleteNews = await newspaper.findByIdAndDelete(req.params.id);
    fs.unlinkSync(`./${deleteNews.newspaper}`);

    if (!deleteNews) return next(new ErrorHandler("News Not Found", 404));

    res.status(200).json({
      success: true,
      data: `News deleted successfully`,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};


// SHOW SPECIFIC NEWSPAPER

export const getSpecificNewspaper = async (req,res,next) =>{
  try {
    const id = req.params.id;
    const specificData = await newspaper.findById(id);

    if (!specificData) return next(new ErrorHandler("News Not Found", 404));
    res.json(specificData);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
}