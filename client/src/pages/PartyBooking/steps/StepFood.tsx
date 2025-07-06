import { Box, Card, CardContent, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { defaultBgColorMap, defaultTextColorMap } from "../../../assets/color/ColorMap";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { CircleDollarSign } from "lucide-react";
import { IFood, IFoodBooking } from "../../../interfaces/food.interface";
import { Close } from "@mui/icons-material";
import FoodDetailMenu from "../../../components/Menu/FoodDetailMenu";

// Hàm gán ảnh theo tên món ăn (dùng link ảnh thực)
function getFoodImage(name: string) {
    const ten = name.toLowerCase();


                    if (ten.includes("gỏi ngó sen tôm thịt")) return  "https://th.bing.com/th/id/R.fe32da71966e285154bb1f967e62f57c?rik=1wjVn1NbcVvnEg&pid=ImgRaw&r=0";
                    else if (ten.includes("gỏi bưởi tôm khô")) return  "https://cdn.tgdd.vn/Files/2018/09/24/1120056/cach-lam-goi-buoi-tom-kho-chua-ngot-cuc-ngon-mieng-202203141704331092.jpg";
                    else if (ten.includes("gỏi cá hồi")) return  "https://file.hstatic.net/1000030244/file/huong-dan-cach-lam-goi-ca-hoi-an-kem-rau-song-cuc-ngon-4_d175b6b7332f4695bdd4e57da27e8eb8_grande.jpg"; 

                    else if (ten.includes("salad hải sản")) return  "https://product.hstatic.net/200000317293/product/mix_seafood_img_7971_73b0cb71620a4323af4d8a5e68981448_1024x1024.png";
                    else if (ten.includes("súp cua")) return  "https://th.bing.com/th/id/R.24bd211cb81ef9181c85ce042810bc65?rik=9AG5Q4yxZUqRvw&riu=http%3a%2f%2fcookingislikelove.com%2fwp%2fwp-content%2fuploads%2f2016%2f07%2feggdropsoup-768x768.jpg&ehk=zr%2bbLQv2WrO4Usf8y6CTn3BvOIt0f2iyMSsKm8zDrfs%3d&risl=&pid=ImgRaw&r=0";
                    else if (ten.includes("súp hải sản")) return  "https://legiaseafood.com/uploads/product/full_xjske3jp7n3luzy-566-sup-hai-san.jpg";
                    else if (ten.includes("súp yến")) return  "https://nunest.vn/wp-content/uploads/2022/04/sup-to-yen-thit-ga.jpg";
                    else if (ten.includes("gà nướng muối ớt")) return  "https://assets.unileversolutions.com/recipes-v2/157827.jpg";

                    else if (ten.includes("tôm hùm hấp bia")) return  "https://tse2.mm.bing.net/th/id/OIP.x-Borxiys_DgAY9CnEdqAQHaHa?rs=1&pid=ImgDetMain";
                    else if (ten.includes("cá chẽm hấp xì dầu")) return  "https://bing.com/th?id=OSK.7e2c4e13ccaa609493060872e6dcab5b";
                    else if (ten.includes("bò wagyu nướng")) return  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3b/ad/44/photo7jpg.jpg";
                    else if (ten.includes("cua hoàng đế rang muối")) return  "https://toplist.vn/images/800px/cua-hoang-de-rang-muoi-735230.jpg";
                    else if (ten.includes("lẩu hải sản")) return  "https://tse1.mm.bing.net/th/id/OIP.fRk8Thk_xn4NF8ZB2lo4YgHaFa?rs=1&pid=ImgDetMain";
                    else if (ten.includes("mì xào hải sản")) return  "https://bing.com/th?id=OSK.01a349ee85a550c7b1cc2e4564445e03";
                    else if (ten.includes("cơm rang dương châu")) return "https://th.bing.com/th/id/R.c8a421d2f6b15f2cc1747eb318e955d8?rik=FAQhV5LzYHSIAw&riu=http%3a%2f%2f4.bp.blogspot.com%2f_2r6KJ_MMRnM%2fS_dckOMSP9I%2fAAAAAAAAAD8%2f0hyXUGzL2-s%2fs1600%2fIMG_5511-1.JPG&ehk=4wtzHNneay8BDG%2fTGjASHFAkbxYe%2fYEV6H4kKMv4eJ0%3d&risl=&pid=ImgRaw&r=0";
                    else if (ten.includes("rau xào tỏi")) return  "https://bing.com/th?id=OSK.f5a0e8ff2504ba3b8f7847291a1f96c8";
                    else if (ten.includes("cơm gà xối mỡ")) return  "https://bing.com/th?id=OSK.f62f294d1dbe6594057ae9a16b7fe606";
                    else if (ten.includes("cơm rang cua")) return  "https://th.bing.com/th/id/OIP.oV4S_HiO9wm896ZJQNgkMgHaEL?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
                    else if (ten.includes("bánh mì")) return  "https://th.bing.com/th/id/OIP.DDnFt7CxIb5LyQ9bNuS5LAHaE9?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

                    else if (ten.includes("bánh flan")) return  "https://th.bing.com/th/id/OIP.aYdlQX_SFxdZSxBrHxeSdQHaE6?w=235&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
                    else if (ten.includes("kem dâu")) return  "https://th.bing.com/th/id/OIP.3OMogq323Iu3pgJmlauymQHaE6?w=264&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
                    else if (ten.includes("gỏi bò bóp thấu")) return  "https://cdn.tgdd.vn/2021/06/CookProduct/3-cach-lam-goi-bo-ngon-dam-da-don-gian-tai-nha-24-760x367-760x367.jpg";
                    else if (ten.includes("gỏi xoài khô mực")) return  "https://cdn.tgdd.vn/Files/2021/08/21/1376848/cach-lam-goi-xoai-kho-muc-chua-ngot-ngon-kho-cuong-202201071120087279.jpg";
                    else if (ten.includes("gỏi cuốn tôm thịt")) return  "https://heyyofoods.com/wp-content/uploads/2024/03/3-4.jpg";
                    else if (ten.includes("nộm đu đủ bò khô")) return  "https://cdn.tgdd.vn/2021/11/CookRecipe/Avatar/thum-1-1.jpg";
                    else if (ten.includes("nộm sứa chua ngọt")) return  "https://pastaxi-manager.onepas.vn/content/uploads/articles/vuonghoai/cach-lam-nom-sua/cach-lam-nom-sua-1.jpg";
                    else if (ten.includes("chả giò hải sản")) return  "https://doiduavang.vn/wp-content/uploads/2021/02/dung-kem-voi-nuoc-cham.jpg";
                    else if (ten.includes("chả giò rế")) return  "https://i.ytimg.com/vi/xhsctW9b_oY/maxresdefault.jpg";
                    else if (ten.includes("chả ram Huế")) return  "https://nethue.com.vn/uploaded/san%20pham/ram%20hue.jpg";
                    else if (ten.includes("nem rán")) return  "https://i-giadinh.vnecdn.net/2024/02/06/Thanh-pham-1-1-4778-1707205070.jpg";
                    else if (ten.includes("bánh phồng tôm + salad Nga")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcTN4MNqztrY4cZALU_MbTTDR6WhBd1TOYZPfQ&s";
                    else if (ten.includes("súp cua trứng bắc thảo")) return  "https://cdn.mediamart.vn/returns/news/hc-cach-lam-sup-cua-trng-bc-tho-dy-d-dinh-dung-sieu-don-gin_0354208b.jpg";
                    else if (ten.includes("súp hải sản nấm tuyết")) return  "https://i.ytimg.com/vi/bWAY7CeJCr4/maxresdefault.jpg";
                    else if (ten.includes("súp gà ngô non")) return  "https://i.ytimg.com/vi/BXi3-3kwP7Q/hqdefault.jpg";
                    else if (ten.includes("súp tôm bí đỏ")) return  "https://cdn.tgdd.vn/2021/02/CookProductThumb/Cach-Nau-Sup-Tom-Bi-Do--Knorr-Natural-0-2-screenshot-620x620.jpg";
                    else if (ten.includes("súp tôm nấm đông cô")) return  "https://nghebep.com/wp-content/uploads/2017/12/sup-tom-nam-huong.jpg";
                    else if (ten.includes("bánh bột lọc nhân tôm")) return  "https://cdn.tgdd.vn/Files/2015/12/05/752695/cach-lam-banh-bot-loc-ngon-6-760x367.jpg";
                    else if (ten.includes("bánh ít trần")) return  "https://cdn.tgdd.vn/Files/2019/11/21/1220862/huong-dan-cach-lam-banh-it-tran-hue-ngon-dung-dieu-760x367.jpg";
                    else if (ten.includes("bánh cuốn nóng")) return  "https://www.cet.edu.vn/wp-content/uploads/2021/12/cach-lam-banh-cuon-nong.jpg";
                    else if (ten.includes("há cảo tôm thịt")) return  "https://cdn-i.vtcnews.vn/resize/th/upload/2024/11/28/ha-cao-tom-thit-21075141.png";
                    else if (ten.includes("xôi vò chả quế")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcSxB5MzsgsC7wcIOAPlDMXZWEPR09ugZIABbg&s";
                    else if (ten.includes("xôi gấc đậu xanh")) return  "https://cdn.tgdd.vn/Files/2016/04/05/812345/cach-nau-xoi-gac-deo-mem-thom-ngon-7-760x367.jpg";
                    else if (ten.includes("xôi lá dứa nước cốt dừa")) return  "https://i.ytimg.com/vi/ybvj2BSnxkc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB9_7RaUe2eon4SPxlAXcPAjtNz2w";
                    else if (ten.includes("xôi nếp than gấc")) return  "https://webnauan.vn/wp-content/uploads/2021/01/cach-nau-xoi-nep-cam.jpg";
                    else if (ten.includes("salad rau củ trộn dầu giấm")) return  "https://cdn.tgdd.vn/Files/2021/08/06/1373466/huong-dan-lam-mon-salad-dau-giam-thom-ngon-bo-duong-de-lam-tai-nha-202201081510043817.jpeg";
                    else if (ten.includes("salad cá ngừ")) return  "https://cdn.tgdd.vn/2020/07/CookProductThumb/Untitled-1-620x620-364.jpg";
                    else if (ten.includes("salad trái cây")) return  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_23_638416217857385936_cac-cong-thuc-salad-hoa-qua-tuoi-mat-thanh-loc-co-the-de-lam-khong-nen-bo-qua.jpg";
                    else if (ten.includes("salad gà xé phay")) return  "https://cdn.tgdd.vn/2021/10/CookRecipe/Avatar/salad-ga-xe-phay-thumbnail.jpg";
                    else if (ten.includes("bò cuộn lá lốt")) return  "https://vnn-imgs-f.vgcloud.vn/2019/01/15/09/cach-lam-bo-cuon-la-lot-thom-nuc-mui-2.jpg?width=0&s=MweLcGFksJ2Vy8qtJDqlBQ";
                    else if (ten.includes("cá hồi xông khói cuộn măng tây")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcQk6AOxmyfN69AsatwbaGOiuDIzFW7V1rahuA&s";
                    else if (ten.includes("chân gà ngâm sả tắc")) return  "https://i.ytimg.com/vi/lrU2qkLeZjM/sddefault.jpg";
                    else if (ten.includes("tôm chiên xù")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcRxlGW8MbnvColezwzf1q74MgOlpamr-J2nNA&s";
                    else if (ten.includes("mực chiên giòn")) return  "https://file.hstatic.net/1000030244/article/muc-chien-xu-gion-2_b564c8c99ca648b78a578e3d3ea5d4de.jpg";
                    else if (ten.includes("bánh bèo chén")) return  "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2021/11/cach-lam-banh-beo-chen-bang-bot-gao-banh-banh-ngot-189955766924.png";
                    else if (ten.includes("chạo tôm mía")) return  "https://cdn.tgdd.vn/2019/12/23/1228146/2-cach-lam-chao-tom-thom-ngon-dam-vi-ai-ai-cung-me-1.jpg";
                    else if (ten.includes("gà hấp hành")) return  "https://i.ytimg.com/vi/A-wL1uusGIc/maxresdefault.jpg";
                    else if (ten.includes("gà quay mật ong")) return  "https://nauco29.com/uploads/content/ga-quay-mat-ong.jpg";
                    else if (ten.includes("gà nướng ngũ vị")) return  "https://assets.unileversolutions.com/recipes-v2/157827.jpg";
                    else if (ten.includes("gà bó xôi")) return  "https://cdn.tgdd.vn/2021/02/CookProduct/1200-1200x676-20.jpg";
                    else if (ten.includes("vịt nướng tiêu xanh")) return  "https://sanaky.org/wp-content/uploads/2024/08/thanh-pham-mon-vit-nuong-tieu-xanh.jpg";
                    else if (ten.includes("vịt quay bắc kinh")) return  "https://bizweb.dktcdn.net/100/448/704/products/vit-quay-bac-kinh-tan-hai-van.jpg?v=1721015341243";
                    else if (ten.includes("heo quay da giòn")) return  "https://i.ytimg.com/vi/x56JojQRJCI/maxresdefault.jpg";
                    else if (ten.includes("heo sữa quay nguyên con")) return  "https://flyfood.vn/web/image/6350-dfa5496e/1.jpg?access_token=c2f48e3d-d7a1-46c4-8561-de5d7a650ab1";
                    else if (ten.includes("thịt bò lúc lắc")) return  "https://hidafoods.vn/wp-content/uploads/2023/07/cach-lam-bo-luc-lac-thom-ngon-chuan-vi-nha-hang-1.jpg";
                    else if (ten.includes("bò sốt tiêu đen")) return  "https://cdn.tgdd.vn/2020/06/CookProductThumb/28-620x620.jpg";
                    else if (ten.includes("bò nấu lagu")) return  "https://i-giadinh.vnecdn.net/2023/02/26/Buoc-6-Thanh-pham-1-1-1914-1677394522.jpg";
                    else if (ten.includes("bò cuốn lá lốt")) return  "https://product.hstatic.net/1000301274/product/cuon-bo-la-lot_1470e1850a3446d0b6f812da72207ab7.jpeg";
                    else if (ten.includes("cá lóc hấp bầu")) return  "https://pastaxi-manager.onepas.vn/content/uploads/articles/huanphan/quan-an-ngon/ca-loc-hap-bau-quan-an-ngon-1.jpg";
                    else if (ten.includes("cá chẽm chiên xù sốt me")) return  "https://i.ytimg.com/vi/6F2bGjwLUYw/maxresdefault.jpg";
                    else if (ten.includes("cá diêu hồng hấp xì dầu")) return  "https://haisanloccantho.com/wp-content/uploads/2024/12/ca-dieu-hong-hap-xi-dau-4.jpg";
                    else if (ten.includes("cá hồi nướng phô mai")) return  "https://cahoi.vn/wp-content/uploads/2024/06/Cach-lam-ca-hoi-nuong-pho-mai-Mozzarella-1.jpg";
                    else if (ten.includes("cá tầm nấu mẻ")) return  "https://cdn.tgdd.vn/Files/2023/05/24/1531302/cach-lam-ca-tam-nau-me-chua-chua-giai-ngay-cho-ca-nha-202305241512073237.jpg";
                    else if (ten.includes("cá rô phi sốt cà")) return  "https://cdn.tgdd.vn/Files/2021/08/27/1378363/huong-dan-cach-lam-mon-ca-ro-phi-ran-sot-ca-chua-ngon-ngot-dam-da-chuan-vi-202201140739108669.jpeg";
                    else if (ten.includes("tôm càng sốt singapore")) return  "https://thuysanvietnam.com.vn/wp-content/uploads/2021/11/tom-cang-xanh-sot-singapore.jpg";
                    else if (ten.includes("tôm hấp bia")) return  "https://unie.com.vn/wp-content/uploads/2021/12/tom-hap-bia-2.jpg.webp";
                    else if (ten.includes("tôm chiên trứng muối")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcT82DHW6zquO-5gObU26vP5iM9E6IkPtJar9g&s";
                    else if (ten.includes("mực nhồi thịt hấp hành gừng")) return  "https://unie.com.vn/wp-content/uploads/2021/12/1200-1200x676-31.jpg.webp";
                    else if (ten.includes("mực chiên nước mắm")) return  "https://i.ytimg.com/vi/nW-OBNnlejg/maxresdefault.jpg";
                    else if (ten.includes("bạch tuộc xào sa tế")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcRpLA5RMLT3hd0hkL7EzfklliwhCn2JZlq7-w&s";
                    else if (ten.includes("cua rang me")) return  "https://cdn.tgdd.vn/2022/02/CookDish/3-cach-lam-mon-cua-rang-me-ngot-tuyet-vi-chua-ngot-avt-1200x676.jpg";
                    else if (ten.includes("ghẹ hấp sả")) return  "https://cdn.tgdd.vn/Files/2020/02/15/1236612/4-cach-lam-ghe-hap-ngon-voi-nguyen-lieu-don-gian-202110231501343882.jpg";
                    else if (ten.includes("ốc hương xào bơ tỏi")) return  "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_10_24_638337429256555003_oc-huong-xao-bo-toi-thumb.jpg";
                    else if (ten.includes("cơm chiên dương châu")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcQHVw7-Czs8JPPWnnmrE1KMuKBMzlRDStcV9Q&s";
                    else if (ten.includes("cơm chiên hải sản")) return  "https://cdn.tgdd.vn/2022/01/CookDishThumb/3-cach-lam-com-chien-hai-san-ngon-mieng-don-gian-hap-dan-thumb-620x620.jpg";
                    else if (ten.includes("mì xào giòn hải sản")) return  "https://cdn.tgdd.vn/Files/2020/06/30/1266665/cach-lam-mi-xao-gion-hai-san-chuan-nguoi-hoa-de-lau-cung-chang-mem-202209081614215235.jpg";
                    else if (ten.includes("hủ tiếu xào thập cẩm")) return  "https://cdn.tgdd.vn/Files/2019/07/25/1181616/huong-dan-hu-tieu-xao-thap-cam-soi-dai-khong-bi-bo-202109231126164690.jpg";
                    else if (ten.includes("miến xào cua")) return  "https://aeonmall-review-rikkei.cdn.vccloud.vn/public/image/ecommerce/products/jtk2irGdGBmtVPdhTMoRyqhGg0jlU8GfmBZt5Xjv.jpg";
                    else if (ten.includes("lẩu hải sản chua cay")) return  "https://i.ytimg.com/vi/p1ejp7z4mc4/hqdefault.jpg";
                    else if (ten.includes("lẩu gà lá é")) return  "https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-248.jpg";
                    else if (ten.includes("lẩu bò nhúng giấm")) return  "https://i.ytimg.com/vi/fq_MLPCYrHQ/maxresdefault.jpg";
                    else if (ten.includes("lẩu cá bớp măng chua")) return  "https://beptruong.edu.vn/wp-content/uploads/2024/06/lau-ca-bop.jpg";
                    else if (ten.includes("lẩu thập cẩm")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcT2NBGiZfso7z-JOTJvtDAxMoS5gwVd00XwZw&s";
                    else if (ten.includes("canh măng mọc")) return  "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2021/10/cach-lam-canh-moc-nau-mang-tuoi-mon-chinh-323374527742.jpg";
                    else if (ten.includes("canh rong biển thịt bằm")) return  "https://cdn.tgdd.vn/2020/12/CookRecipe/Avatar/CANHRONGBIENCachnaucanhrongbienthomngonBepCuaVo0-8screenshot.jpg";
                    else if (ten.includes("canh nấm tuyết gà xé")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcRMcGv4usm-ZlTbscCv6dutsM4OK4BttMPItA&s";
                    else if (ten.includes("rau câu 3 tầng")) return  "https://cdn2.fptshop.com.vn/unsafe/2024_1_18_638412156621577284_cach-nau-rau-cau.jpg";
                    else if (ten.includes("rau câu dừa")) return  "https://cdn.tgdd.vn/2021/11/CookRecipe/Avatar/rau-cau-dua-soi-thumbnail.jpg";
                    else if (ten.includes("chè hạt sen long nhãn")) return  "https://cdn.tgdd.vn/2022/07/CookRecipe/GalleryStep/thanh-pham-231.jpg";
                    else if (ten.includes("chè đậu xanh")) return  "https://www.btaskee.com/wp-content/uploads/2021/08/che-dau-xanh-nuoc-cot-dua.jpeg";
                    else if (ten.includes("chè trôi nước")) return  "https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-303.jpg";
                    else if (ten.includes("chè khoai dẻo")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcQNkYDr17NHPLUnzDsleulKJgeuyWlEBJ4ZYQ&s";
                    else if (ten.includes("chè khúc bạch")) return  "https://cdn.tgdd.vn/2021/07/CookProduct/1-1200x676-1.jpg";
                    else if (ten.includes("chè thái")) return "https://chehuevungtau.com/thumbs/830x600x1/upload/product/z55946991811156138d904a4259a9fcf9a1d5f44e08a3d-4115.jpg";
                    else if (ten.includes("trái cây dĩa")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcTtW4dOLBoO5853rrH1nZcT0bVmChE8yKCH_w&s";
                    else if (ten.includes("dưa lưới cắt nghệ thuật")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcSwyL35s0XOQv2uBveD_mpNThhw8flSEaojXw&s";
                    else if (ten.includes("kem trái cây")) return  "https://cdn.tgdd.vn/2020/07/CookProduct/41-1200x676.jpg";
                    else if (ten.includes("kem vani socola")) return  "https://d3t8sg1k0hxoja.cloudfront.net/watermarked1/1177.webp";
                    else if (ten.includes("mousse xoài")) return  "https://s3-ap-southeast-1.amazonaws.com/happie-bucket/3/d/a/3daa82dd-71e2-419b-bc33-55d3178aab11-origin.jpeg";
                    else if (ten.includes("mousse dâu")) return  "https://thuhuongcake.vn/wp-content/uploads/2024/05/Banh-mousse-dau-tay.webp";
                    else if (ten.includes("panna cotta")) return  "https://product.hstatic.net/200000723779/product/db38f3510d39410aa85fc8de6cb6762e_a37ff6a2a933494fbf569f42bbd47466.jpeg";
                    else if (ten.includes("bánh flan caramel")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcT8wXb_ANn3IBMcOotnhn9pG9MAtS3FVqb8Hw&s";
                    else if (ten.includes("bánh su kem")) return "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcQDgNuJJR0rGxmhAiOkK0ZIJHVhE0ix3miaXw&s";
                    else if (ten.includes("bánh tart trứng")) return  "https://file.hstatic.net/200000721249/file/h_tart_trung_bang_noi_chien_khong_dau_b701f1d2d3d644429912379031d77916.jpg";
                    else if (ten.includes("bánh mousse chanh dây")) return  "https://encrypted-tbn0.gstatic.com/returns?q=tbn:ANd9GcRP0udB9S15lStWlmUm-jomFDyfh9Kh-0jaLg&s";
                    else if (ten.includes("bánh tiramisu")) return  "https://cdn.tgdd.vn/Files/2021/08/08/1373908/tiramisu-la-gi-y-nghia-cua-banh-tiramisu-202108082258460504.jpg";
                    else if (ten.includes("bánh brownie socola")) return  "https://amicofood.com/uploadfiles/returns/banh-brownie.jpg";
                    else if (ten.includes("bánh cuộn lá dứa")) return  "https://media.baothaibinh.com.vn/upload/news/5_2019/79993_la_dua_bao_boc_nhan_dua.jpg";
                    else if (ten.includes("xôi ngũ sắc nước cốt dừa")) return  "https://cdn.tgdd.vn/Files/2021/08/01/1372243/cach-nau-xoi-ngu-sac-nuoc-cot-dua-beo-thom-mau-sac-doc-dao-moi-la-202108011251190569.jpg";
                    else if (ten.includes("sâm bổ lượng")) return  "https://cdn.tgdd.vn/2021/09/CookRecipe/GalleryStep/thanh-pham-1327.jpg";
                    else if (ten.includes("trà sữa hạt chia")) return  "https://cdn.tgdd.vn/2021/02/CookRecipe/GalleryStep/thanh-pham-1174.jpg";

                    else if (ten.includes("bánh bao")) return "data:image/webp;base64,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";

    return "https://via.placeholder.com/400x220?text=No+Image";
}

const NullFood = {
    _id: '',
    name: "",
    description: "",
    price: 0,
    image: "",
    category: ""
};

export default function StepFood() {
    const { watch, setValue, formState: { errors }  } = useFormContext();
    const [searchKey, setSearchKey] = useState("");
    const [foodDetail, setFoodDetail] = useState(NullFood);
    const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<IFoodBooking[]>(watch("foods") || []);
    const [foods, setFoods] = useState<IFood[]>([]);

    // Fetch foods từ backend và gán ảnh minh họa bằng link thực
    useEffect(() => {
        fetch("http://localhost:3000/api/monan")
            .then(res => res.json())
            .then(data => setFoods(data.map((item: any) => ({
                _id: item._id,
                name: item.TENMONAN,
                description: item.GHICHU,
                price: item.DONGIA,
                image: getFoodImage(item.TENMONAN),
                category: item.LOAI
            }))));
    }, []);

    useEffect(() => {
        setValue("foods", selectedFoods);
    }, [selectedFoods]);

    const minTablePrice = watch("hall")?.minTablePrice || 0;
    const tablePrice = selectedFoods.reduce((sum, item) => sum + item.price, 0);
    const totalTables = (watch("tables") || 0) + (watch("reserveTables") || 0);

    const filteredFoods = foods.filter((food) => {
        return food.name.toLowerCase().includes(searchKey.toLowerCase());
    });

    const handleSelectFood = (food: IFood) => {
        setSelectedFoods((prev) => {
            if (prev.some(item => item.foodId === food._id)) return prev;
            return [...prev, {
                ...food,
                foodId: food._id,
                note: ""
            }];
        });
    };

    const handleDeleteFood = (deleteId: string) => {
        const updatedFoods = selectedFoods.filter(f => f.foodId !== deleteId);
        setSelectedFoods(updatedFoods);
    };

    const handleChangeNote = (foodId: string, note: string) => {
        setSelectedFoods((prev) =>
            prev.map(item =>
                item.foodId === foodId ? { ...item, note } : item
            )
        );
    };

    return (
        <Box sx={{
            display: 'flex', gap: '20px', height: '100%'
        }}>
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                pr: 1,
            }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                    rowGap: '20px',
                    columnGap: { sm: '3%', md: '2%' },
                    padding: '3px',
                }}>
                    {filteredFoods.map((food) => (
                        <Card
                            key={food._id}
                            onClick={() => { handleSelectFood(food) }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                cursor: "pointer",
                                border:
                                    selectedFoods.some(f => f.foodId === food._id)
                                        ? "3px solid #4880FF"
                                        : "1px solid #ccc",
                                boxShadow: selectedFoods.some(f => f.foodId === food._id) ? 4 : 1,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={food.image}
                                sx={{
                                    width: '100%',
                                    objectFit: 'cover',
                                    height: 200,
                                }}
                            />
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '10px',
                                flexGrow: 1
                            }}>
                                <Typography
                                    onClick={() => {
                                        setFoodDetail(food);
                                        setIsDetailMenuOpen(true);
                                    }}
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        '&:hover': {
                                            color: '#4880FF',
                                        },
                                    }}
                                >
                                    {food.name}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                    <Typography sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: 'hidden',
                                        WebkitLineClamp: 2,
                                        color: 'GrayText',
                                        fontSize: '14px',
                                        height: '45px',
                                    }}>
                                        {food.description}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <CircleDollarSign size="18px" />
                                        <Typography color="text.secondary" fontSize={14}>
                                            {food.price.toLocaleString('vi-VN')} VND
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        width: 'auto',
                                        height: '30px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 2,
                                        backgroundColor: defaultBgColorMap[food.category],
                                        color: defaultTextColorMap[food.category],
                                        fontWeight: 'bold',
                                    }}>
                                        {food.category}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '170px', md: '300px' },
                gap: '10px',
                padding: '2px'
            }}>
                <SearchBar
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                }}>Món đã chọn</Typography>

                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: '7px',
                    padding: '2px',
                    overflowY: 'auto',
                    pr: 1,
                }}>
                    {selectedFoods.map((item) => (
                        <Box
                            key={item.foodId}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderRadius: 3,
                                boxShadow: 3
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                padding: '15px 20px',
                            }}>
                                <Typography sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                }}>
                                    {item.name}
                                </Typography>

                                <Box sx={{
                                    width: 'fit-content',
                                    padding: '4px 6px',
                                    borderRadius: 2,
                                    backgroundColor: defaultBgColorMap[item.category],
                                    color: defaultTextColorMap[item.category],
                                    fontWeight: 'bold',
                                }}>
                                    {item.category}
                                </Box>

                                <TextField
                                    value={item.note}
                                    onChange={(e) => handleChangeNote(item.foodId, e.target.value)}
                                    placeholder="Ghi chú"
                                    multiline
                                    variant="standard"
                                />

                            </Box>

                            <IconButton
                                sx={{ height: 'fit-content' }}
                                onClick={() => { handleDeleteFood(item.foodId) }}
                            >
                                <Close sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Box>
                    ))}
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    paddingY: '7px',
                }}>

                    {errors.foods && (
                        <Typography color="error" fontSize="18px">
                            {errors.foods.message}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Đơn giá bàn tối thiểu:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: 'green',
                        }}>
                            {minTablePrice.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Đơn giá bàn:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: tablePrice >= minTablePrice ? 'green' : 'red',
                        }}>
                            {tablePrice.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Tổng tiền bàn:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: 'green',
                        }}>
                            {(tablePrice * totalTables).toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <FoodDetailMenu
                open={isDetailMenuOpen}
                onClose={() => setIsDetailMenuOpen(false)}
                initialData={foodDetail}
            />
        </Box>
    );
}