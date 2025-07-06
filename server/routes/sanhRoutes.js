const express = require('express');
const router = express.Router();
const Sanh = require('./../models/Sanh')
const Tieccuoi = require('./../models/Tieccuoi'); 
const Hoadon = require('./../models/Hoadon')

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
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});
// Xóa sảnh theo id

router.delete('/:id', async (req, res) => {
  try {
    const hallId = req.params.id;

    // 1) Xác định các tiệc cưới thuộc sảnh này và gom mã tiệc
    const parties = await Tieccuoi.find({ MASANH: hallId }).select('MATIEC');
    const partyCodes = parties.map(p => p.MATIEC);

    // 2) Xoá sảnh
    const deletedHall = await Sanh.findByIdAndDelete(hallId);
    if (!deletedHall) {
      return res.status(404).json({ error: 'Sảnh không tồn tại' });
    }

    // 3) Xoá tiệc cưới
    const { deletedCount: deletedPartiesCount } = await Tieccuoi.deleteMany({ MASANH: hallId });
    console.log(`Đã xoá ${deletedPartiesCount} tiệc cưới.`);

    // 4) Xoá hoá đơn cho những tiệc vừa xoá
    const { deletedCount: deletedInvoicesCount } = await Hoadon.deleteMany({ MATIEC: { $in: partyCodes } });
    console.log(`Đã xoá ${deletedInvoicesCount} hoá đơn.`);

    return res.status(200).json({
      message: 'Xóa thành công sảnh, tiệc cưới và hoá đơn liên quan',
      deletedParties: deletedPartiesCount,
      deletedInvoices: deletedInvoicesCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
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