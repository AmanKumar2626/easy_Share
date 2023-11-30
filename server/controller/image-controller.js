import File from "../models/file.js";
import { setFileUrl } from "./fileUrl.js";

export const uploadImage = async (request, response) => {
    const fileObj = {
        path : request.file.path,
        name: request.file.originalname
    }
    try{
        const file = await File.create(fileObj);
        const fileUrl = `https://easy-share-backend.onrender.com/file/${file._id}`;
        setFileUrl(fileUrl);
        console.log(file);
        response.status(200).json({path: fileUrl});
        
    }catch(error){
        console.error(error.message);
        response.status(500).json({error: error.message})
      
    }
}

export const downloadImage = async (request, response) => {
    try {
      const file = await File.findById(request.params.fileId);

      file.downloadContent++;
      await file.save();

      response.download(file.path,file.name);
    }catch(error){
        console.error(error.message);
        return response.status(500).json({error: error.message});
    }
}
