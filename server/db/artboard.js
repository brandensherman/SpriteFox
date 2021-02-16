const mongoose = require('mongoose');

const ArtboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grid: {
    type: Object,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

module.exports = mongoose.model('Artboard', ArtboardSchema);
