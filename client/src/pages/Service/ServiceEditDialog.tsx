import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { Service as ServiceType } from './serviceData';

interface ServiceEditDialogProps {
    open: boolean;
    onClose: () => void;
    service: ServiceType | null;
    categories: string[];
}

const ServiceEditDialog: React.FC<ServiceEditDialogProps> = ({ open, onClose, service, categories }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa dịch vụ</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên dịch vụ" variant="outlined" fullWidth defaultValue={service?.name || ''} />
                <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select label="Danh mục" defaultValue={service?.category || ''}>
                        {categories.filter(cat => cat !== 'Tất cả').map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Mô tả" variant="outlined" multiline rows={4} fullWidth defaultValue={service?.description || ''} />
                <TextField label="Giá" variant="outlined" type="number" fullWidth defaultValue={service?.price || ''} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">Hủy</Button>
                    <Button variant="contained" onClick={onClose}>Lưu</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceEditDialog; 