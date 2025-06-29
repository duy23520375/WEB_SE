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
    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Súp', 'Món Xào', 'Món Cơm', 'Món Ăn Kèm'];
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState<FoodType | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState<FoodType | null>(null);
    const [foods, setFoods] = useState<FoodType[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/monan')
            .then(res => res.json())
            .then(data =>
                {
                console.log("DATA FROM API:", data);
                setFoods(data)
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
        // Xử lý thêm món ăn mới ở đây
        // Ví dụ: thêm vào foodList hoặc state foods nếu có
        setAddDialogOpen(false);
    };

    const handleDeleteClick = (food: FoodType) => {
        setFoodToDelete(food);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Xử lý xóa món ăn ở đây
        setDeleteDialogOpen(false);
        setFoodToDelete(null);
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

    return (
        <div className="food-container">
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
                    <div key={food.id} className="food-card" style={{
                        flex: '0 1 calc(25% - 18px)',
                        minWidth: '240px',
                        maxWidth: '1fr',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 8,
                            zIndex: 2
                        }}>
                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleEditClick(food)}>
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
                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleDeleteClick(food)}>
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
            />
        </div>
    );
}
