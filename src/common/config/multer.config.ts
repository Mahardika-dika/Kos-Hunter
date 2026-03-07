import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

const uploadPath = join(process.cwd(), 'Uploads');

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

export const multerConfig = {
  storage: diskStorage({
    destination: './Uploads',
    filename(req, file, callback) {
      const original = file.originalname.replace(/\s+/g, '_');
      const ext = original.split('.').pop();
      const name = original.replace(`.${ext}`, '');
      const unique = Date.now();
      //   console.log('Multer Successfully Hit: ', file.originalname);

      callback(null, `${name}_${unique}.${ext}`);
    },
  }),

  filterFile(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error('Only image files are allowed'), false);
    }

    callback(null, true);
  },

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
