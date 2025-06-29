
const mongoose = require('mongoose');
const Sanh = require('./models/Sanh'); // Đường dẫn tới model Sanh của bạn


const images = [
  "ảnh 1.webp", "ảnh 2.webp", "ảnh 3.jpg", "ảnh 4.jpg", "ảnh 5.jpg",
  "ảnh 6.png", "ảnh 7.jpg", "ảnh 8.jpg", "ảnh 9.jpg", "ảnh 10.jpg",
  "ảnh 11.jpg", "ảnh 12.jpg", "ảnh 13.jpg", "ảnh 14.jpeg", "ảnh 15.jpg"
];

async function updateImages() {
  await mongoose.connect('mongodb://localhost:27017/ten_database_cua_ban'); // sửa tên database cho đúng
  const sanhs = await Sanh.find();
  for (let i = 0; i < sanhs.length && i < images.length; i++) {
    sanhs[i].image = images[i];
    await sanhs[i].save();
  }
  console.log('Đã cập nhật xong ảnh cho các sảnh!');
  mongoose.disconnect();
}

updateImages();