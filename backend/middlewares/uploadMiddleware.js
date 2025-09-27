const multer = require('multer');
const path = require('path');

// set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fname = `${Date.now()}-${Math.round(Math.random()*1E9)}${ext}`;
    cb(null, fname);
  }
});

// file filter
function fileFilter (req, file, cb) {
  const allowed = /jpeg|jpg/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = allowed.test(file.mimetype);
  const extname = allowed.test(ext);
  if(mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG/JPG images allowed'));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 300 * 1024 } // 300KB
});

module.exports = upload;
