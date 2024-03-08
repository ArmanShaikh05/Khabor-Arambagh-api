import express from "express"
import { createNews, getSpecificData, showAllNews, updateNewsData , deleteNews, showCategoryNews} from "../controllers/newsController.js"
import { uploadMiddleware } from "../middlewares/multer.js"


const router = express.Router()


router.post("/create", uploadMiddleware.single('file'), createNews)

router.get("/news",showAllNews)

router.get("/news/category",showCategoryNews)

router.get("/edit/:id", getSpecificData)

router.get("/news/:id",getSpecificData)

router.put("/update/:id",uploadMiddleware.single('file'), updateNewsData)

router.delete("/delete/:id",uploadMiddleware.single('file') , deleteNews )

export default router