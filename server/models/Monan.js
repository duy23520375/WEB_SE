const mongoose = require('mongoose')

const MonanSchema = new mongoose.Schema({
  TENMONAN: {
    type: String,
    required: true
  },
  DONGIA: {
    type: Number,
    required: true
  },
  GHICHU: {
    type: String
  },
  LOAI: {
    type: String,
    required: true
  }
})

const Monan = mongoose.model('Monan', MonanSchema);
module.exports = Monan;