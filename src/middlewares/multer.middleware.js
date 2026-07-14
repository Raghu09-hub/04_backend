import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
        //it will save the file with  same filename as uploaded
    }
})

export const upload = multer({
    storage,
})