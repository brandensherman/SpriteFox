const router = require('express').Router();
const { Artboard } = require('../db');

router.post('/artboards', async (req, res, next) => {
  try {
    const artboard = await Artboard.create(req.body);

    res.status(201).json({ success: true, data: artboard });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
