import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

interface FoodAddDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    categories: string[];
}

const FoodAddDialog: React.FC<FoodAddDialogProps> = ({ open, onClose, onSave, categories }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e: any) => {
        setForm({ ...form, category: e.target.value });
    };

    const handleSave = () => {
        onSave(form);
        setForm({ name: '', description: '', price: '', category: '', image: null });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Thêm món ăn</DialogTitle>
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
                {/* Có thể bổ sung upload ảnh nếu muốn */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">Hủy</Button>
                    <Button variant="contained" onClick={handleSave}>Lưu</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FoodAddDialog; 