const mongoose = require('mongoose')

const DichvuSchema = new mongoose.Schema({
  TENDICHVU: {
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
  DANHMUC: {
    type: String,
    required: false
  },
})

const Dichvu = mongoose.model('Dichvu', DichvuSchema);
module.exports = Dichvu;