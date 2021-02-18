const router = require('express').Router();
const { Artboard } = require('../db');

router.get('/artboards/:id', async (req, res, next) => {
  try {
    const artboards = await Artboard.find({ user: req.params.id });

    console.log(artboards);

    res.status(200).json({ success: true, artboards });
  } catch (error) {
    console.log(error);
  }
});

router.post('/artboards', async (req, res, next) => {
  try {
    console.log(req.body);
    const artboard = await Artboard.create(req.body);
    console.log(artboard);
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
