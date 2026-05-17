import multer from 'multer';

// Zero-Disk Storage Policy: Documents held entirely in volatile execution memory
const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Strict 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const validMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (validMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only .pdf, .docx, and .txt are allowed.'));
    }
  },
});
