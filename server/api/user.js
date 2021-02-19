const router = require('express').Router();
const { Artboard } = require('../db');
const protect = require('../middleware/protect');
// Get Single Artboard
router.get('/artboards/:name', protect, async (req, res, next) => {
  try {
    const artboard = await Artboard.findOne({ name: req.params.name });
    res.status(200).json({ success: true, artboard: artboard.grid });
  } catch (error) {
    console.log(error);
  }
});

// Get All Artboards
router.get('/:id', protect, async (req, res, next) => {
  try {
    const artboards = await Artboard.find({ user: req.params.id });
    res.status(200).json({ success: true, artboards });
  } catch (error) {
    console.log(error);
  }
});

router.post('/artboards', protect, async (req, res, next) => {
  try {
    const artboard = await Artboard.create(req.body);

    res.status(201).json({ success: true, data: artboard });
  } catch (error) {
    console.log(error);
  }
});

router.put('/artboards', protect, async (req, res, next) => {
  try {
    const artboard = await Artboard.findOne({
      name: req.body.name,
    });

    const updatedArtboard = await Artboard.findOneAndUpdate(
      { name: artboard.name, _id: artboard._id },
      { grid: req.body.mappedGrid },
      { new: true }
    );

    res.status(200).json({ success: true, updatedArtboard });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
