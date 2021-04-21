import { Router } from 'express';
import { uploadFile } from '../controllers/file-upload.controller';

const fileUploadRoute = Router();
fileUploadRoute.route('/v1/uploads').post(uploadFile);

export default fileUploadRoute;
