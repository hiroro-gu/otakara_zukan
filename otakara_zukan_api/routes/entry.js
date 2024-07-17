const router = require('express').Router();
const Entry = require('../models/entry.model');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  const { title, content, zukanId } = req.body;
  const image = req.file.path;

  try {
    const entry = new Entry({ title, content, image, zukan: zukanId });
    await entry.save();
    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 他のルートも追加してください（例：GET, PUT, DELETE）

module.exports = router;
