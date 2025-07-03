const express = require('express');
const router = express.Router();
const Tieccuoi = require('./../models/Tieccuoi')
const Hoadon = require('./../models/Hoadon')



router.post('/', async (req, res) => {
  try {
    const count = await Tieccuoi.countDocuments();
    const newMaTiec = `TC${String(count + 1).padStart(2, '0')}`;

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
      const isLate = new Date(updatedTieccuoiData.NGAYDAI) < new Date();
      const tienCoc = updated.TIENCOC;
      const tienPhaiTra = isLate ? tienCoc * 10 * 1.01 : tienCoc * 10;

      await Hoadon.findOneAndUpdate(
        { MATIEC: updated.MATIEC },
        { $set: { TONGTIEN: tienPhaiTra } }
      );

      console.log(`Hóa đơn đã cập nhật (${isLate ? 'trễ hạn' : 'đúng hạn'})`);
    }

    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});




router.delete('/:id', async (req,res)=> {
  try {
    const tieccuoiId = req.params.id;
    const response = await Tieccuoi.findByIdAndDelete(tieccuoiId)
    if (!response) {
      return res.status(404).json({error: 'Tiệc cưới not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router