import { useState, useEffect } from 'react';
import {  Food as FoodType } from './foodData';
import './Food.css';
import { Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import FoodAddDialog from './FoodAddDialog.tsx';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import EditIcon from '@mui/icons-material/Edit';
import FoodEditDialog from './FoodEditDialog.tsx';
import PetalAnimation from '../../components/Animations/PetalAnimation';
import FoodDetailMenu from '../../components/Menu/FoodDetailMenu';

export default function Food() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openDialog, setOpenDialog] = useState(false);
    const [newFood, setNewFood] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null,
    });
    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Súp', 'Món Xào', 'Món Cơm', 'Món Ăn Kèm', 'Món Tráng Miệng'];
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState<FoodType | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
     const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState<FoodType | null>(null);
    const [foods, setFoods] = useState<FoodType[]>([]);
    
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
            else if (ten.includes("gỏi bưởi tôm khô")) image = "https://cdn.tgdd.vn/Files/2018/09/24/1120056/cach-lam-goi-buoi-tom-kho-chua-ngot-cuc-ngon-mieng-202203141704331092.jpg";
            else if (ten.includes("gỏi cá hồi")) image = "https://file.hstatic.net/1000030244/file/huong-dan-cach-lam-goi-ca-hoi-an-kem-rau-song-cuc-ngon-4_d175b6b7332f4695bdd4e57da27e8eb8_grande.jpg"; 
            else if (ten.includes("gỏi cuốn tôm thịt")) image = "https://naucohungthinh.com/files/media/202109/5519_4.jpg";
            else if (ten.includes("salad hải sản")) image = "https://product.hstatic.net/200000317293/product/mix_seafood_img_7971_73b0cb71620a4323af4d8a5e68981448_1024x1024.png";
            else if (ten.includes("súp cua")) image = "https://th.bing.com/th/id/R.24bd211cb81ef9181c85ce042810bc65?rik=9AG5Q4yxZUqRvw&riu=http%3a%2f%2fcookingislikelove.com%2fwp%2fwp-content%2fuploads%2f2016%2f07%2feggdropsoup-768x768.jpg&ehk=zr%2bbLQv2WrO4Usf8y6CTn3BvOIt0f2iyMSsKm8zDrfs%3d&risl=&pid=ImgRaw&r=0";
            else if (ten.includes("súp hải sản")) image = "https://legiaseafood.com/uploads/product/full_xjske3jp7n3luzy-566-sup-hai-san.jpg";
            else if (ten.includes("súp yến")) image = "https://nunest.vn/wp-content/uploads/2022/04/sup-to-yen-thit-ga.jpg";
            else if (ten.includes("gà nướng muối ớt")) image = "https://vinmec-prod.s3.amazonaws.com/images/20210602_135237_351289_ga-nuong-muoi-ot.max-1800x1800.png";
            else if (ten.includes("vịt quay bắc kinh")) image = "https://th.bing.com/th/id/R.5eec5176d1702b3333e8b6d0d55f3f3a?rik=sB5q4o8R19FZtw&pid=ImgRaw&r=0&sres=1&sresct=1";
            else if (ten.includes("tôm hùm hấp bia")) image = "https://tse2.mm.bing.net/th/id/OIP.x-Borxiys_DgAY9CnEdqAQHaHa?rs=1&pid=ImgDetMain";
            else if (ten.includes("cá chẽm hấp xì dầu")) image = "https://bing.com/th?id=OSK.7e2c4e13ccaa609493060872e6dcab5b";
            else if (ten.includes("bò wagyu nướng")) image = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3b/ad/44/photo7jpg.jpg";
            else if (ten.includes("cua hoàng đế rang muối")) image = "https://toplist.vn/images/800px/cua-hoang-de-rang-muoi-735230.jpg";
            else if (ten.includes("lẩu hải sản")) image = "https://tse1.mm.bing.net/th/id/OIP.fRk8Thk_xn4NF8ZB2lo4YgHaFa?rs=1&pid=ImgDetMain";
            else if (ten.includes("mì xào hải sản")) image = "https://bing.com/th?id=OSK.01a349ee85a550c7b1cc2e4564445e03";
            else if (ten.includes("cơm rang dương châu")) image = "https://th.bing.com/th/id/R.c8a421d2f6b15f2cc1747eb318e955d8?rik=FAQhV5LzYHSIAw&riu=http%3a%2f%2f4.bp.blogspot.com%2f_2r6KJ_MMRnM%2fS_dckOMSP9I%2fAAAAAAAAAD8%2f0hyXUGzL2-s%2fs1600%2fIMG_5511-1.JPG&ehk=4wtzHNneay8BDG%2fTGjASHFAkbxYe%2fYEV6H4kKMv4eJ0%3d&risl=&pid=ImgRaw&r=0";
            else if (ten.includes("rau xào tỏi")) image = "https://bing.com/th?id=OSK.f5a0e8ff2504ba3b8f7847291a1f96c8";
            else if (ten.includes("cơm gà xối mỡ")) image = "https://bing.com/th?id=OSK.f62f294d1dbe6594057ae9a16b7fe606";
            else if (ten.includes("cơm rang cua")) image = "https://th.bing.com/th/id/OIP.oV4S_HiO9wm896ZJQNgkMgHaEL?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
            else if (ten.includes("bánh mì")) image = "https://th.bing.com/th/id/OIP.DDnFt7CxIb5LyQ9bNuS5LAHaE9?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
            else if (ten.includes("chè thái")) image = "https://th.bing.com/th/id/OIP.0N10MDnCILJj0uhGkJ_E9gHaFa?w=211&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
            else if (ten.includes("bánh flan")) image = "https://th.bing.com/th/id/OIP.aYdlQX_SFxdZSxBrHxeSdQHaE6?w=235&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
            else if (ten.includes("kem dâu")) image = "https://th.bing.com/th/id/OIP.3OMogq323Iu3pgJmlauymQHaE6?w=264&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
            else if (ten.includes("bánh bao")) image ="data:image/webp;base64,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",
            // ...bổ sung các điều kiện cho món khác nếu muốn
            console.log("FE nhận từ BE _id:", item._id);
            return {
                id: item.MAMONAN || item._id,
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
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewFood({
            name: '',
            description: '',
            price: '',
            category: '',
            image: null,
        });
    };
    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleAddFood = (data: any) => {
    // data sẽ có cả category, nhưng bạn chỉ lấy các trường cần gửi lên BE
    const payload = {
        MAMONAN: `mon-an-${Date.now()}`,
        TENMONAN: data.name,
        GHICHU: data.description,
        DONGIA: data.price,
        LOAI: data.category
        // KHÔNG gửi category lên backend!
    };

    fetch('http://localhost:3000/api/monan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(newFood => {
    if (!newFood || !newFood.TENMONAN) {
        alert("Thêm món ăn thất bại! Kiểm tra lại dữ liệu nhập.");
        return;
    }
    setFoods(prev => [
        ...prev,
        {
            id: newFood.MAMONAN || newFood._id || Date.now(),
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
        <div className="food-container">
            <PetalAnimation />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Danh Sách Món Ăn</h2>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        bgcolor: '#4880FF',
                        '&:hover': {
                            bgcolor: '#3660CC',
                        },
                    }}
                    onClick={handleOpenAddDialog}
                >
                    Thêm món ăn
                </Button>
            </div>
            
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
    );
}
