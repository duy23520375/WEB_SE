import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { Food as FoodType } from './foodData';

interface FoodEditDialogProps {
    open: boolean;
    onClose: () => void;
    food: FoodType | null;
    categories: string[];
    onSave: (data: FoodType) => void; // Thêm prop này
}

const FoodEditDialog: React.FC<FoodEditDialogProps> = ({ open, onClose, food, categories, onSave }) => {
    const [form, setForm] = useState<FoodType | null>(food);

    useEffect(() => {
        setForm(food);
    }, [food]);

    if (!form) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e: any) => {
        setForm({ ...form, category: e.target.value });
    };

    const handleSave = () => {
        if (!form.name || !form.price) {
            alert("Vui lòng nhập đầy đủ tên món và giá!");
            return;
        }
        onSave({ ...form, price: Number(form.price) });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa món ăn</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên món" name="name" variant="outlined" fullWidth value={form.name} onChange={handleChange} />
                <TextField label="Mô tả" name="description" variant="outlined" fullWidth value={form.description} onChange={handleChange} />
                <TextField label="Giá" name="price" variant="outlined" type="number" fullWidth value={form.price} onChange={handleChange} />
                <FormControl fullWidth>
                    <InputLabel>Loại món</InputLabel>
                    <Select label="Loại món" value={form.category} onChange={handleCategoryChange}>
                        {categories.filter(c => c !== 'Tất cả').map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">Hủy</Button>
                    <Button variant="contained" onClick={handleSave}>Lưu</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FoodEditDialog;