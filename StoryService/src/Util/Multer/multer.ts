import multer from "multer";
import { Request } from 'express';
import path from "path";
const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
      console.log('hiiiiiiiiiiiii');
      
      callback(null, path.join(__dirname, '../../../public/story'));
  },
  filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
});
