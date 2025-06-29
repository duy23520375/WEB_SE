const express = require('express');
const router = express.Router();
const Sanh = require('./../models/Sanh')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newSanh = new Sanh(data);
    const response = await newSanh.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Sanh.find();
    // Gán MASANH = _id cho mỗi sảnh
    const mapped = data.map(hall => ({
      ...hall.toObject(),
      MASANH: hall._id
    }));
    res.status(200).json(mapped);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});
// Xóa sảnh theo id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Xóa sảnh với id:", id); // Thêm dòng này để kiểm tra
    const deleted = await Sanh.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Sảnh không tồn tại' });
    }
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});
// Sửa thông tin sảnh theo id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log("PUT /api/sanh/:id", { id, updateData }); // Thêm dòng này để kiểm tra
    const updated = await Sanh.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Sảnh không tồn tại' });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});
module.exports = router