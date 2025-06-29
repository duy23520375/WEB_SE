import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { Food as FoodType } from './foodData';

interface FoodEditDialogProps {
    open: boolean;
    onClose: () => void;
    food: FoodType | null;
    categories: string[];
}

const FoodEditDialog: React.FC<FoodEditDialogProps> = ({ open, onClose, food, categories }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa món ăn</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên món" variant="outlined" fullWidth defaultValue={food?.name || ''} />
                <TextField label="Mô tả" variant="outlined" fullWidth defaultValue={food?.description || ''} />
                <TextField label="Giá" variant="outlined" type="number" fullWidth defaultValue={food?.price || ''} />
                <FormControl fullWidth>
                    <InputLabel>Loại món</InputLabel>
                    <Select label="Loại món" defaultValue={food?.category || ''}>
                        {categories.filter(c => c !== 'Tất cả').map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">Hủy</Button>
                    <Button variant="contained" onClick={onClose}>Lưu</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FoodEditDialog; 