const router = require('express').Router();
const { Artboard } = require('../db');

router.get('/artboards', async (req, res, next) => {
  try {
    const artboards = await Artboard.find();

    res.status(200).json({ success: true, artboards });
  } catch (error) {
    console.log(error);
  }
});

router.post('/artboards', async (req, res, next) => {
  try {
    const artboard = await Artboard.create(req.body);

    res.status(201).json({ success: true, data: artboard });
  } catch (error) {
    console.log(error);
  }
});

router.put('/artboards', async (req, res, next) => {
  try {
    const artboard = await Artboard.findOne({
      name: req.body.name,
    });

    const updatedArtboard = await Artboard.findOneAndUpdate(
      { name: artboard.name, _id: artboard._id },
      req.body,
      { new: true }
    );
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
