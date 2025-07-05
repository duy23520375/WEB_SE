const express = require('express');
const router = express.Router();
const Taikhoan = require('./../models/Taikhoan')
const bcrypt = require('bcrypt'); 

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newTaikhoan = new Taikhoan(data);
    const response = await newTaikhoan.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Taikhoan.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const taikhoanId = req.params.id;
    const updatedTaikhoanData = req.body;

    const response = await Taikhoan.findByIdAndUpdate(taikhoanId, updatedTaikhoanData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Tài khoản not found'})
    }
    console.log('data updated')
    res.status(200).json(response)
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

router.delete('/:id', async (req,res)=> {
  try {
    const taikhoanId = req.params.id;
    const response = await Taikhoan.findByIdAndDelete(taikhoanId)
    if (!response) {
      return res.status(404).json({error: 'Tài khoản not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})


// Đăng nhập: kiểm tra tên đăng nhập và mật khẩu đã hash
router.post('/login', async (req, res) => {
  const { TenDangNhap, MatKhau } = req.body;

  try {
    const user = await Taikhoan.findOne({ TenDangNhap });

    if (!user) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    return res.status(200).json({
      username: user.TenDangNhap,
      role: user.LoaiTK
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});



module.exports = router