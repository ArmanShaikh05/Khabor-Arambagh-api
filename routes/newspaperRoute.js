import express from "express"
import  multer  from "multer"
import { createNewspaper, deleteNewpaper, getNewspapers, getSpecificNewspaper } from "../controllers/newspaperController.js"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})

const uploadMiddleware = multer({ storage: storage })

const router = express.Router()



router.get("/newspaper"  , getNewspapers)

router.post("/newspaper/create", uploadMiddleware.single('newspaper') , createNewspaper)

router.delete("/newspaper/delete/:id",uploadMiddleware.single('newspaper') , deleteNewpaper )

router.get("/newspaper/:id", getSpecificNewspaper)

export default router