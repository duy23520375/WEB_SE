import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { Service as ServiceType } from './serviceData';

interface ServiceEditDialogProps {
    open: boolean;
    onClose: () => void;
    service: ServiceType | null;
    categories: string[];
    onSave: (data: ServiceType) => void;
}

const ServiceEditDialog: React.FC<ServiceEditDialogProps> = ({ open, onClose, service, categories, onSave }) => {
    // Thêm state cho form ở đây
    const [form, setForm] = React.useState<ServiceType | null>(service);

    // Khi service thay đổi (mở dialog sửa dịch vụ khác), cập nhật lại form
    React.useEffect(() => {
        setForm(service);
    }, [service]);

    if (!form) return null;

    // Xử lý thay đổi input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e: any) => {
        setForm({ ...form, category: e.target.value });
    };

    const handleSave = () => {
        onSave({ ...form, price: Number(form.price) });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa dịch vụ</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên dịch vụ" name="name" variant="outlined" fullWidth value={form.name} onChange={handleChange} />
                <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select label="Danh mục" value={form.category} onChange={handleCategoryChange}>
                        {categories.filter(cat => cat !== 'Tất cả').map((category) => (
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
export default ServiceEditDialog; 