const router = require('express').Router();
const Zukan = require('../models/zukan.model');

router.post('/', async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const zukan = new Zukan({ title, description, user: userId });
    await zukan.save();
    res.status(201).send(zukan);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 他のルートも追加してください（例：GET, PUT, DELETE）

module.exports = router;
