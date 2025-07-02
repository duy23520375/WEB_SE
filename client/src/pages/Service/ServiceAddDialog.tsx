import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

interface ServiceAddDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    categories: string[];
}

const ServiceAddDialog: React.FC<ServiceAddDialogProps> = ({ open, onClose, onSave, categories }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e: any) => {
        setForm({ ...form, category: e.target.value });
    };

    const handleSave = () => {
    if (!form.name || !form.category || !form.price) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    onSave({
        ...form,
        price: Number(form.price), // Đảm bảo giá là số
    });
    setForm({ name: '', description: '', price: '', category: '' });
};

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Thêm dịch vụ mới</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên dịch vụ" name="name" variant="outlined" fullWidth value={form.name} onChange={handleChange} />
                <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select label="Danh mục" value={form.category} onChange={handleCategoryChange}>
                        {categories.filter(cat => cat !== 'Tất cả').map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Mô tả" name="description" variant="outlined" multiline rows={4} fullWidth value={form.description} onChange={handleChange} />
                <TextField label="Giá" name="price" variant="outlined" type="number" fullWidth value={form.price} onChange={handleChange} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">Hủy</Button>
                    <Button variant="contained" onClick={handleSave}>Lưu</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceAddDialog; 