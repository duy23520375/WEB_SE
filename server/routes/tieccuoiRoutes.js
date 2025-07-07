const express = require('express');
const router = express.Router();
const Tieccuoi = require('./../models/Tieccuoi')
const Hoadon = require('./../models/Hoadon')
const { v4: uuidv4 } = require('uuid');


router.post('/', async (req, res) => {
  try {
    const newMaTiec = uuidv4();

    const data = req.body;
    data.MATIEC = newMaTiec;

    // Default trạng thái
    if (!data.TRANGTHAI) {
      data.TRANGTHAI = 'Đã đặt cọc';
    }

    const newTieccuoi = new Tieccuoi(data);
    const savedTieccuoi = await newTieccuoi.save();
    console.log('Tiệc cưới đã lưu');

    // ✅ Tạo hóa đơn tương ứng
    const newHoadon = new Hoadon({
      MATIEC: newMaTiec,
      NGAYTHANHTOAN: data.NGAYDAI,
      TONGTIEN: data.TRANGTHAI === 'Đã thanh toán'
        ? data.TIENCOC * 10
        : data.TIENCOC,
    });
    await newHoadon.save();
    console.log('Hóa đơn đã tạo');

    res.status(200).json(savedTieccuoi);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const data = await Tieccuoi.find(); 
    console.log('Data fetched',data);
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const tieccuoiId = req.params.id;
    const updatedTieccuoiData = req.body;

    const updated = await Tieccuoi.findByIdAndUpdate(
      tieccuoiId,
      updatedTieccuoiData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Tiệc cưới không tồn tại' });
    }

    // ✅ Nếu trạng thái là "Đã thanh toán"
    if (updatedTieccuoiData.TRANGTHAI === 'Đã thanh toán') {
      const eventDate = new Date(updatedTieccuoiData.NGAYDAI);
      const today = new Date();
      // Tính số ngày trễ (làm tròn lên)
      const msPerDay = 1000 * 60 * 60 * 24;
      const daysLate = Math.max(0, Math.ceil((today - eventDate) / msPerDay));

      const tienCoc = updated.TIENCOC;
      // Gốc là 10x tiền cọc, sau đó cộng phạt % theo số ngày trễ
      const multiplier = 1 + (daysLate-1) / 100;
      const tienPhaiTra = tienCoc * 10 * multiplier;

      await Hoadon.findOneAndUpdate(
        { MATIEC: updated.MATIEC },
        { $set: { TONGTIEN: tienPhaiTra } }
      );

      console.log(`Hóa đơn đã cập nhật (${daysLate} ngày trễ -> phạt ${daysLate}%)`);
    }

    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    // 1) Xoá tiệc cưới và lấy về document vừa bị xoá
    const deletedParty = await Tieccuoi.findByIdAndDelete(req.params.id);
    if (!deletedParty) {
      return res.status(404).json({ error: 'Tiệc cưới không tồn tại' });
    }
    console.log(`Đã xoá tiệc cưới ${deletedParty.MATIEC}`);

    // 2) Xoá luôn hoá đơn liên quan
    await Hoadon.deleteMany({ MATIEC: deletedParty.MATIEC });
    console.log(`Đã xoá tất cả hoá đơn của tiệc ${deletedParty.MATIEC}`);

    // 3) Trả về kết quả
    return res.status(200).json({ message: 'Xoá thành công tiệc cưới và hoá đơn liên quan' });
  } catch (err) {
    console.error('Lỗi khi xoá:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message
    });
  }
});
module.exports = router