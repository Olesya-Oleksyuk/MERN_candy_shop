import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Настройка двика дискового пространства (расположение и имя файла)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Функция для контроля принятия файлов
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(null, false);
    cb(new Error('Ошибка загрузки изображения! Доступные расширения: jpg, jpeg, png'));
  }
};

// конфигурация multer-мидлвара
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
