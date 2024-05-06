const multer = require('multer');
const path = require('path');
// const express = require('express');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/uploads/")
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        const ext = file.mimetype.split('/')[1];
        console.log(`${Date.now()}.${ext}`)
        cb(null, `${Date.now()}.${ext}`);
        // cb(null, path.join(__dirname, 'uploads', `${Date.now()}.${ext}`));
        // path.join(__dirname, 'uploads', file.originalname)
        // const filename = `file_${crypto.randomUUID()}`;
        // cb(null, filename); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };


const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 100,
    },
    fileFilter: fileFilter,
});

module.exports = upload;