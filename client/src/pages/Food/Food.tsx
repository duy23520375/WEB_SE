import { useState, useEffect } from 'react';
import { Food as FoodType } from './foodData';
import './Food.css';
import { Button, Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import FoodAddDialog from './FoodAddDialog.tsx';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import EditIcon from '@mui/icons-material/Edit';
import FoodEditDialog from './FoodEditDialog.tsx';
import PetalAnimation from '../../components/Animations/PetalAnimation';
import FoodDetailMenu from '../../components/Menu/FoodDetailMenu';
import SearchBar from '../../components/SearchBar';
import { RoleBasedRender } from '../../components/RoleBasedRender.tsx';
import { IFood } from '../../interfaces/food.interface.ts';

export default function Food() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Tráng Miệng'];
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState<FoodType | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState<FoodType | null>(null);
    const [foods, setFoods] = useState<FoodType[]>([]);
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/api/monan')
            .then(res => res.json())
            .then(data => {
                console.log("DATA FROM API:", data);

                const mapped = data.map((item: any) => {
                    const ten = item.TENMONAN?.toLowerCase() || "";

                    // Gán ảnh theo tên món
                    let image = "/images/default-food.jpg";
                    if (ten.includes("gỏi ngó sen tôm thịt")) image = "https://th.bing.com/th/id/R.fe32da71966e285154bb1f967e62f57c?rik=1wjVn1NbcVvnEg&pid=ImgRaw&r=0";
                    else if (ten.includes("gỏi bò bóp thấu")) image = "https://cdn.tgdd.vn/2021/06/CookProduct/3-cach-lam-goi-bo-ngon-dam-da-don-gian-tai-nha-24-760x367-760x367.jpg";
                    else if (ten.includes("gỏi xoài khô mực")) image = "https://cdn.tgdd.vn/Files/2021/08/21/1376848/cach-lam-goi-xoai-kho-muc-chua-ngot-ngon-kho-cuong-202201071120087279.jpg";
                    else if (ten.includes("gỏi cuốn tôm thịt")) image = "https://heyyofoods.com/wp-content/uploads/2024/03/3-4.jpg";
                    else if (ten.includes("nộm đu đủ bò khô")) image = "https://cdn.tgdd.vn/2021/11/CookRecipe/Avatar/thum-1-1.jpg";
                    else if (ten.includes("nộm sứa chua ngọt")) image = "https://pastaxi-manager.onepas.vn/content/uploads/articles/vuonghoai/cach-lam-nom-sua/cach-lam-nom-sua-1.jpg";
                    else if (ten.includes("chả giò hải sản")) image = "https://doiduavang.vn/wp-content/uploads/2021/02/dung-kem-voi-nuoc-cham.jpg";
                    else if (ten.includes("chả giò rế")) image = "https://i.ytimg.com/vi/xhsctW9b_oY/maxresdefault.jpg";
                    else if (ten.includes("chả ram Huế")) image = "https://nethue.com.vn/uploaded/san%20pham/ram%20hue.jpg";
                    else if (ten.includes("nem rán")) image = "https://i-giadinh.vnecdn.net/2024/02/06/Thanh-pham-1-1-4778-1707205070.jpg";
                    else if (ten.includes("bánh phồng tôm + salad Nga")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN4MNqztrY4cZALU_MbTTDR6WhBd1TOYZPfQ&s";
                    else if (ten.includes("súp cua trứng bắc thảo")) image = "https://cdn.mediamart.vn/images/news/hc-cach-lam-sup-cua-trng-bc-tho-dy-d-dinh-dung-sieu-don-gin_0354208b.jpg";
                    else if (ten.includes("súp hải sản nấm tuyết")) image = "https://i.ytimg.com/vi/bWAY7CeJCr4/maxresdefault.jpg";
                    else if (ten.includes("súp gà ngô non")) image = "https://i.ytimg.com/vi/BXi3-3kwP7Q/hqdefault.jpg";
                    else if (ten.includes("súp tôm bí đỏ")) image = "https://cdn.tgdd.vn/2021/02/CookProductThumb/Cach-Nau-Sup-Tom-Bi-Do--Knorr-Natural-0-2-screenshot-620x620.jpg";
                    else if (ten.includes("súp tôm nấm đông cô")) image = "https://nghebep.com/wp-content/uploads/2017/12/sup-tom-nam-huong.jpg";
                    else if (ten.includes("bánh bột lọc nhân tôm")) image = "https://cdn.tgdd.vn/Files/2015/12/05/752695/cach-lam-banh-bot-loc-ngon-6-760x367.jpg";
                    else if (ten.includes("bánh ít trần")) image = "https://cdn.tgdd.vn/Files/2019/11/21/1220862/huong-dan-cach-lam-banh-it-tran-hue-ngon-dung-dieu-760x367.jpg";
                    else if (ten.includes("bánh cuốn nóng")) image = "https://www.cet.edu.vn/wp-content/uploads/2021/12/cach-lam-banh-cuon-nong.jpg";
                    else if (ten.includes("há cảo tôm thịt")) image = "https://cdn-i.vtcnews.vn/resize/th/upload/2024/11/28/ha-cao-tom-thit-21075141.png";
                    else if (ten.includes("xôi vò chả quế")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxB5MzsgsC7wcIOAPlDMXZWEPR09ugZIABbg&s";
                    else if (ten.includes("xôi gấc đậu xanh")) image = "https://cdn.tgdd.vn/Files/2016/04/05/812345/cach-nau-xoi-gac-deo-mem-thom-ngon-7-760x367.jpg";
                    else if (ten.includes("xôi lá dứa nước cốt dừa")) image = "https://i.ytimg.com/vi/ybvj2BSnxkc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB9_7RaUe2eon4SPxlAXcPAjtNz2w";
                    else if (ten.includes("xôi nếp than gấc")) image = "https://webnauan.vn/wp-content/uploads/2021/01/cach-nau-xoi-nep-cam.jpg";
                    else if (ten.includes("salad rau củ trộn dầu giấm")) image = "https://cdn.tgdd.vn/Files/2021/08/06/1373466/huong-dan-lam-mon-salad-dau-giam-thom-ngon-bo-duong-de-lam-tai-nha-202201081510043817.jpeg";
                    else if (ten.includes("salad cá ngừ")) image = "https://cdn.tgdd.vn/2020/07/CookProductThumb/Untitled-1-620x620-364.jpg";
                    else if (ten.includes("salad trái cây")) image = "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_23_638416217857385936_cac-cong-thuc-salad-hoa-qua-tuoi-mat-thanh-loc-co-the-de-lam-khong-nen-bo-qua.jpg";
                    else if (ten.includes("salad gà xé phay")) image = "https://cdn.tgdd.vn/2021/10/CookRecipe/Avatar/salad-ga-xe-phay-thumbnail.jpg";
                    else if (ten.includes("bò cuộn lá lốt")) image = "https://vnn-imgs-f.vgcloud.vn/2019/01/15/09/cach-lam-bo-cuon-la-lot-thom-nuc-mui-2.jpg?width=0&s=MweLcGFksJ2Vy8qtJDqlBQ";
                    else if (ten.includes("cá hồi xông khói cuộn măng tây")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6AOxmyfN69AsatwbaGOiuDIzFW7V1rahuA&s";
                    else if (ten.includes("chân gà ngâm sả tắc")) image = "https://i.ytimg.com/vi/lrU2qkLeZjM/sddefault.jpg";
                    else if (ten.includes("tôm chiên xù")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxlGW8MbnvColezwzf1q74MgOlpamr-J2nNA&s";
                    else if (ten.includes("mực chiên giòn")) image = "https://file.hstatic.net/1000030244/article/muc-chien-xu-gion-2_b564c8c99ca648b78a578e3d3ea5d4de.jpg";
                    else if (ten.includes("bánh bèo chén")) image = "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2021/11/cach-lam-banh-beo-chen-bang-bot-gao-banh-banh-ngot-189955766924.png";
                    else if (ten.includes("chạo tôm mía")) image = "https://cdn.tgdd.vn/2019/12/23/1228146/2-cach-lam-chao-tom-thom-ngon-dam-vi-ai-ai-cung-me-1.jpg";
                    else if (ten.includes("gà hấp hành")) image = "https://i.ytimg.com/vi/A-wL1uusGIc/maxresdefault.jpg";
                    else if (ten.includes("gà quay mật ong")) image = "https://nauco29.com/uploads/content/ga-quay-mat-ong.jpg";
                    else if (ten.includes("gà nướng ngũ vị")) image = "https://assets.unileversolutions.com/recipes-v2/157827.jpg";
                    else if (ten.includes("gà bó xôi")) image = "https://cdn.tgdd.vn/2021/02/CookProduct/1200-1200x676-20.jpg";
                    else if (ten.includes("vịt nướng tiêu xanh")) image = "https://sanaky.org/wp-content/uploads/2024/08/thanh-pham-mon-vit-nuong-tieu-xanh.jpg";
                    else if (ten.includes("vịt quay bắc kinh")) image = "https://bizweb.dktcdn.net/100/448/704/products/vit-quay-bac-kinh-tan-hai-van.jpg?v=1721015341243";
                    else if (ten.includes("heo quay da giòn")) image = "https://i.ytimg.com/vi/x56JojQRJCI/maxresdefault.jpg";
                    else if (ten.includes("heo sữa quay nguyên con")) image = "https://flyfood.vn/web/image/6350-dfa5496e/1.jpg?access_token=c2f48e3d-d7a1-46c4-8561-de5d7a650ab1";
                    else if (ten.includes("thịt bò lúc lắc")) image = "https://hidafoods.vn/wp-content/uploads/2023/07/cach-lam-bo-luc-lac-thom-ngon-chuan-vi-nha-hang-1.jpg";
                    else if (ten.includes("bò sốt tiêu đen")) image = "https://cdn.tgdd.vn/2020/06/CookProductThumb/28-620x620.jpg";
                    else if (ten.includes("bò nấu lagu")) image = "https://i-giadinh.vnecdn.net/2023/02/26/Buoc-6-Thanh-pham-1-1-1914-1677394522.jpg";
                    else if (ten.includes("bò cuốn lá lốt")) image = "https://product.hstatic.net/1000301274/product/cuon-bo-la-lot_1470e1850a3446d0b6f812da72207ab7.jpeg";
                    else if (ten.includes("cá lóc hấp bầu")) image = "https://pastaxi-manager.onepas.vn/content/uploads/articles/huanphan/quan-an-ngon/ca-loc-hap-bau-quan-an-ngon-1.jpg";
                    else if (ten.includes("cá chẽm chiên xù sốt me")) image = "https://i.ytimg.com/vi/6F2bGjwLUYw/maxresdefault.jpg";
                    else if (ten.includes("cá diêu hồng hấp xì dầu")) image = "https://haisanloccantho.com/wp-content/uploads/2024/12/ca-dieu-hong-hap-xi-dau-4.jpg";
                    else if (ten.includes("cá hồi nướng phô mai")) image = "https://cahoi.vn/wp-content/uploads/2024/06/Cach-lam-ca-hoi-nuong-pho-mai-Mozzarella-1.jpg";
                    else if (ten.includes("cá tầm nấu mẻ")) image = "https://cdn.tgdd.vn/Files/2023/05/24/1531302/cach-lam-ca-tam-nau-me-chua-chua-giai-ngay-cho-ca-nha-202305241512073237.jpg";
                    else if (ten.includes("cá rô phi sốt cà")) image = "https://cdn.tgdd.vn/Files/2021/08/27/1378363/huong-dan-cach-lam-mon-ca-ro-phi-ran-sot-ca-chua-ngon-ngot-dam-da-chuan-vi-202201140739108669.jpeg";
                    else if (ten.includes("tôm càng sốt singapore")) image = "https://thuysanvietnam.com.vn/wp-content/uploads/2021/11/tom-cang-xanh-sot-singapore.jpg";
                    else if (ten.includes("tôm hấp bia")) image = "https://unie.com.vn/wp-content/uploads/2021/12/tom-hap-bia-2.jpg.webp";
                    else if (ten.includes("tôm chiên trứng muối")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82DHW6zquO-5gObU26vP5iM9E6IkPtJar9g&s";
                    else if (ten.includes("mực nhồi thịt hấp hành gừng")) image = "https://unie.com.vn/wp-content/uploads/2021/12/1200-1200x676-31.jpg.webp";
                    else if (ten.includes("mực chiên nước mắm")) image = "https://i.ytimg.com/vi/nW-OBNnlejg/maxresdefault.jpg";
                    else if (ten.includes("bạch tuộc xào sa tế")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpLA5RMLT3hd0hkL7EzfklliwhCn2JZlq7-w&s";
                    else if (ten.includes("cua rang me")) image = "https://cdn.tgdd.vn/2022/02/CookDish/3-cach-lam-mon-cua-rang-me-ngot-tuyet-vi-chua-ngot-avt-1200x676.jpg";
                    else if (ten.includes("ghẹ hấp sả")) image = "https://cdn.tgdd.vn/Files/2020/02/15/1236612/4-cach-lam-ghe-hap-ngon-voi-nguyen-lieu-don-gian-202110231501343882.jpg";
                    else if (ten.includes("ốc hương xào bơ tỏi")) image = "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_10_24_638337429256555003_oc-huong-xao-bo-toi-thumb.jpg";
                    else if (ten.includes("cơm chiên dương châu")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVw7-Czs8JPPWnnmrE1KMuKBMzlRDStcV9Q&s";
                    else if (ten.includes("cơm chiên hải sản")) image = "https://cdn.tgdd.vn/2022/01/CookDishThumb/3-cach-lam-com-chien-hai-san-ngon-mieng-don-gian-hap-dan-thumb-620x620.jpg";
                    else if (ten.includes("mì xào giòn hải sản")) image = "https://cdn.tgdd.vn/Files/2020/06/30/1266665/cach-lam-mi-xao-gion-hai-san-chuan-nguoi-hoa-de-lau-cung-chang-mem-202209081614215235.jpg";
                    else if (ten.includes("hủ tiếu xào thập cẩm")) image = "https://cdn.tgdd.vn/Files/2019/07/25/1181616/huong-dan-hu-tieu-xao-thap-cam-soi-dai-khong-bi-bo-202109231126164690.jpg";
                    else if (ten.includes("miến xào cua")) image = "https://aeonmall-review-rikkei.cdn.vccloud.vn/public/image/ecommerce/products/jtk2irGdGBmtVPdhTMoRyqhGg0jlU8GfmBZt5Xjv.jpg";
                    else if (ten.includes("lẩu hải sản chua cay")) image = "https://i.ytimg.com/vi/p1ejp7z4mc4/hqdefault.jpg";
                    else if (ten.includes("lẩu gà lá é")) image = "https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-248.jpg";
                    else if (ten.includes("lẩu bò nhúng giấm")) image = "https://i.ytimg.com/vi/fq_MLPCYrHQ/maxresdefault.jpg";
                    else if (ten.includes("lẩu cá bớp măng chua")) image = "https://beptruong.edu.vn/wp-content/uploads/2024/06/lau-ca-bop.jpg";
                    else if (ten.includes("lẩu thập cẩm")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2NBGiZfso7z-JOTJvtDAxMoS5gwVd00XwZw&s";
                    else if (ten.includes("canh măng mọc")) image = "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2021/10/cach-lam-canh-moc-nau-mang-tuoi-mon-chinh-323374527742.jpg";
                    else if (ten.includes("canh rong biển thịt bằm")) image = "https://cdn.tgdd.vn/2020/12/CookRecipe/Avatar/CANHRONGBIENCachnaucanhrongbienthomngonBepCuaVo0-8screenshot.jpg";
                    else if (ten.includes("canh nấm tuyết gà xé")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcGv4usm-ZlTbscCv6dutsM4OK4BttMPItA&s";
                    else if (ten.includes("rau câu 3 tầng")) image = "https://cdn2.fptshop.com.vn/unsafe/2024_1_18_638412156621577284_cach-nau-rau-cau.jpg";
                    else if (ten.includes("rau câu dừa")) image = "https://cdn.tgdd.vn/2021/11/CookRecipe/Avatar/rau-cau-dua-soi-thumbnail.jpg";
                    else if (ten.includes("chè hạt sen long nhãn")) image = "https://cdn.tgdd.vn/2022/07/CookRecipe/GalleryStep/thanh-pham-231.jpg";
                    else if (ten.includes("chè đậu xanh")) image = "https://www.btaskee.com/wp-content/uploads/2021/08/che-dau-xanh-nuoc-cot-dua.jpeg";
                    else if (ten.includes("chè trôi nước")) image = "https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-303.jpg";
                    else if (ten.includes("chè khoai dẻo")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNkYDr17NHPLUnzDsleulKJgeuyWlEBJ4ZYQ&s";
                    else if (ten.includes("chè khúc bạch")) image = "https://cdn.tgdd.vn/2021/07/CookProduct/1-1200x676-1.jpg";
                    else if (ten.includes("chè thái")) image = "https://chehuevungtau.com/thumbs/830x600x1/upload/product/z55946991811156138d904a4259a9fcf9a1d5f44e08a3d-4115.jpg";
                    else if (ten.includes("trái cây dĩa")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtW4dOLBoO5853rrH1nZcT0bVmChE8yKCH_w&s";
                    else if (ten.includes("dưa lưới cắt nghệ thuật")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyL35s0XOQv2uBveD_mpNThhw8flSEaojXw&s";
                    else if (ten.includes("kem trái cây")) image = "https://cdn.tgdd.vn/2020/07/CookProduct/41-1200x676.jpg";
                    else if (ten.includes("kem vani socola")) image = "https://d3t8sg1k0hxoja.cloudfront.net/watermarked1/1177.webp";
                    else if (ten.includes("mousse xoài")) image = "https://s3-ap-southeast-1.amazonaws.com/happie-bucket/3/d/a/3daa82dd-71e2-419b-bc33-55d3178aab11-origin.jpeg";
                    else if (ten.includes("mousse dâu")) image = "https://thuhuongcake.vn/wp-content/uploads/2024/05/Banh-mousse-dau-tay.webp";
                    else if (ten.includes("panna cotta")) image = "https://product.hstatic.net/200000723779/product/db38f3510d39410aa85fc8de6cb6762e_a37ff6a2a933494fbf569f42bbd47466.jpeg";
                    else if (ten.includes("bánh flan caramel")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wXb_ANn3IBMcOotnhn9pG9MAtS3FVqb8Hw&s";
                    else if (ten.includes("bánh su kem")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgNuJJR0rGxmhAiOkK0ZIJHVhE0ix3miaXw&s";
                    else if (ten.includes("bánh tart trứng")) image = "https://file.hstatic.net/200000721249/file/h_tart_trung_bang_noi_chien_khong_dau_b701f1d2d3d644429912379031d77916.jpg";
                    else if (ten.includes("bánh mousse chanh dây")) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0udB9S15lStWlmUm-jomFDyfh9Kh-0jaLg&s";
                    else if (ten.includes("bánh tiramisu")) image = "https://cdn.tgdd.vn/Files/2021/08/08/1373908/tiramisu-la-gi-y-nghia-cua-banh-tiramisu-202108082258460504.jpg";
                    else if (ten.includes("bánh brownie socola")) image = "https://amicofood.com/uploadfiles/images/banh-brownie.jpg";
                    else if (ten.includes("bánh cuộn lá dứa")) image = "https://media.baothaibinh.com.vn/upload/news/5_2019/79993_la_dua_bao_boc_nhan_dua.jpg";
                    else if (ten.includes("xôi ngũ sắc nước cốt dừa")) image = "https://cdn.tgdd.vn/Files/2021/08/01/1372243/cach-nau-xoi-ngu-sac-nuoc-cot-dua-beo-thom-mau-sac-doc-dao-moi-la-202108011251190569.jpg";
                    else if (ten.includes("sâm bổ lượng")) image = "https://cdn.tgdd.vn/2021/09/CookRecipe/GalleryStep/thanh-pham-1327.jpg";
                    else if (ten.includes("trà sữa hạt chia")) image = "https://cdn.tgdd.vn/2021/02/CookRecipe/GalleryStep/thanh-pham-1174.jpg";

                        // ...bổ sung các điều kiện cho món khác nếu muốn
                        console.log("FE nhận từ BE _id:", item._id);
                    return {
                        id: item._id,
                        _id: item._id,
                        name: item.TENMONAN,
                        description: item.GHICHU,
                        price: item.DONGIA,
                        category: item.LOAI,
                        image,
                    };
                });
                setFoods(mapped);
            })
            .catch(err => console.error(err));
    }, []);
    const filteredFoods = selectedCategory === 'Tất cả'
        ? foods
        : foods.filter(food => food.category === selectedCategory);

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleAddFood = (data: any) => {

        // data sẽ có cả category, nhưng bạn chỉ lấy các trường cần gửi lên BE
        const payload = {
            TENMONAN: data.name,
            GHICHU: data.description,
            DONGIA: data.price,
            LOAI: data.category
            // KHÔNG gửi category lên backend!
        };
        console.log("Gửi lên BE:", payload);


        fetch('http://localhost:3000/api/monan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(newFood => {
                console.log("Kết quả trả về:", newFood);
                if (!newFood || !newFood.TENMONAN) {
                    alert("Thêm món ăn thất bại! Kiểm tra lại dữ liệu nhập.");
                    return;
                }
                setFoods(prev => [
                    ...prev,
                    {
                        id: newFood._id,
                        _id: newFood._id || "",
                        name: newFood.TENMONAN,
                        description: newFood.GHICHU,
                        price: Number(newFood.DONGIA) || 0,
                        category: data.category,
                        image:
                            newFood.TENMONAN === "Gỏi cuốn tôm thịt"
                                ? "https://th.bing.com/th/id/R.fe32da71966e285154bb1f967e62f57c?rik=1wjVn1NbcVvnEg&pid=ImgRaw&r=0"
                                : "/images/default-food.jpg",
                    }
                ]);
                setAddDialogOpen(false);
            })
            .catch(err => {
                alert("Thêm món ăn thất bại!");
                console.error(err);
            });
    };

    const handleUpdateFood = (updatedFood: FoodType) => {
        fetch(`http://localhost:3000/api/monan/${updatedFood._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TENMONAN: updatedFood.name,
                GHICHU: updatedFood.description,
                DONGIA: Number(updatedFood.price),
                // Không cần gửi category, image nếu backend không lưu
            }),
        })
            .then(res => res.json())
            .then(data => {
                setFoods(prev =>
                    prev.map(food => food._id === updatedFood._id ? { ...food, ...updatedFood } : food)
                );
                setEditDialogOpen(false);
                setFoodToEdit(null);
            })
            .catch(() => alert("Cập nhật thất bại!"));
    };
    
    const handleDeleteClick = (food: FoodType) => {
        setFoodToDelete(food);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!foodToDelete) return;
        console.log("FE gửi lên BE _id:", foodToDelete._id);
        fetch(`http://localhost:3000/api/monan/${foodToDelete._id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    setFoods(prev => prev.filter(food => food._id !== foodToDelete._id)); // Sửa dòng này
                    setDeleteDialogOpen(false);
                    setFoodToDelete(null);
                } else {
                    alert("Xóa món ăn thất bại!");
                }
            })
            .catch(err => {
                alert("Xóa món ăn thất bại!");
                setDeleteDialogOpen(false);
                setFoodToDelete(null);
            });
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setFoodToDelete(null);
    };

    const handleEditClick = (food: FoodType) => {
        setFoodToEdit(food);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setFoodToEdit(null);
    };
    const handleFoodClick = (food: IFood) => {
        setSelectedFood(food);
        setDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setDetailDialogOpen(false);
        setSelectedFood(null);
    };


    return (
        <Box sx={{ background: '#f5f6fa', minHeight: '100vh', p: 0, position: 'relative', overflow: 'hidden' }}>

            <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', maxWidth: 1400, mx: 'auto', width: '100%', position: 'relative', zIndex: 1 }}>
                <Box sx={{ height: '100vh', overflowY: 'auto', pr: 2 }}>
                    <div className="food-container">
                        <PetalAnimation />
                        <Typography
                            sx={{
                                userSelect: "none",
                                color: "var(--text-color)",
                                fontWeight: "bold",
                                fontSize: "32px",
                                marginBottom: "20px",
                                textAlign: 'left',
                            }}
                        >
                            Danh Sách Món Ăn
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: "20px",
                                marginX: "20px",
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                width: "40%",
                            }}>
                                <SearchBar
                                    value={searchKey}
                                    onChange={e => setSearchKey(e.target.value)} />
                            </Box>

                            <RoleBasedRender allow="Admin">
                                <Button
                                    variant="contained"
                                    startIcon={<AddCircleOutlineIcon />}
                                    sx={{
                                        alignSelf: 'flex-end',
                                        padding: '10px 30px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        borderRadius: '8px',
                                        backgroundColor: '#4880FF',
                                        '&:hover': {
                                            backgroundColor: "#3578f0",
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                        },
                                        textTransform: "none",
                                    }}
                                    onClick={handleAddFood}
                                >
                                    Thêm món ăn
                                </Button>
                            </RoleBasedRender>
                        </Box>

                        <div className="category-filter">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="food-grid" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 24,
                            justifyContent: 'flex-start',


                        }}>
                            {filteredFoods.map((food: FoodType) => (
                                <div key={food._id} className="food-card" style={{
                                    flex: '0 1 calc(25% - 18px)',
                                    minWidth: '240px',
                                    maxWidth: '1fr',
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}
                                    onClick={() => handleFoodClick(food)}
                                >
                                    <RoleBasedRender allow="Admin">
                                        <div style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            display: 'flex',
                                            gap: 8,
                                            zIndex: 2
                                        }}>
                                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(food);
                                                }}>
                                                <Box
                                                    sx={{
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                        transition: 'background 0.2s, box-shadow 0.2s',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            bgcolor: '#f0f0f0',
                                                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                                            '& .MuiSvgIcon-root': { opacity: 1 }
                                                        }
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" sx={{ color: '#00e1ff', opacity: 0.85, transition: 'opacity 0.2s' }} />
                                                </Box>
                                            </Button>
                                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(food);
                                                }}>
                                                <Box
                                                    sx={{
                                                        bgcolor: '#fff',
                                                        borderRadius: '50%',
                                                        p: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                        transition: 'background 0.2s, box-shadow 0.2s',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            bgcolor: '#f0f0f0',
                                                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                                            '& .MuiSvgIcon-root': { opacity: 1 }
                                                        }
                                                    }}
                                                >
                                                    <DeleteOutline fontSize="small" sx={{ color: '#ff0000', opacity: 0.85, transition: 'opacity 0.2s' }} />
                                                </Box>
                                            </Button>
                                        </div>
                                    </RoleBasedRender>
                                    
                                    <img src={food.image} alt={food.name} className="food-image" />
                                    <div className="food-info">
                                        <h3>{food.name}</h3>
                                        <p>{food.description}</p>
                                        <p className="food-price">{food.price.toLocaleString('vi-VN')} VNĐ</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <FoodAddDialog
                            open={addDialogOpen}
                            onClose={handleCloseAddDialog}
                            onSave={handleAddFood}
                            categories={categories}
                        />
                        <ConfirmDelete
                            open={deleteDialogOpen}
                            onClose={handleDeleteCancel}
                            onConfirm={handleDeleteConfirm}
                        />
                        <FoodEditDialog
                            open={editDialogOpen}
                            onClose={handleCloseEditDialog}
                            food={foodToEdit}
                            categories={categories}
                            onSave={handleUpdateFood}
                        />
                        {selectedFood && (
                            <FoodDetailMenu
                                open={detailDialogOpen}
                                onClose={handleCloseDetailDialog}
                                initialData={selectedFood}
                            />
                        )}
                    </div>
                </Box>
            </Box>
        </Box>
    );
}
