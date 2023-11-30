import express from 'express';
import {uploadImage, downloadImage} from '../controller/image-controller.js'
import {sendMail} from '../controller/sendMail.js'
import upload from '../utils/upload.js';

const app = express();

app.use(express.json());

const router = express.Router();

router.post('/upload',upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.post('/email',sendMail);
export default router;
