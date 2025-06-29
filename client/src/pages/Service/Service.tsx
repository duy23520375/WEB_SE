import { useState } from 'react';
import { serviceList, Service as ServiceType } from './serviceData';
import './Service.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ServiceAddDialog from './ServiceAddDialog.tsx';
import ServiceEditDialog from './ServiceEditDialog.tsx';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';

export default function Service() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openAddServiceDialog, setOpenAddServiceDialog] = useState<boolean>(false);
    const [openEditServiceDialog, setOpenEditServiceDialog] = useState<boolean>(false);
    const [serviceToEdit, setServiceToEdit] = useState<ServiceType | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [serviceToDelete, setServiceToDelete] = useState<ServiceType | null>(null);
    const categories = ['Tất cả', 'Trang Trí', 'MC & Ca Sĩ', 'Quay Chụp', 'Làm Đẹp', 'Trang Phục', 'Phương Tiện', 'Thiệp & Quà', 'Bánh & Rượu', 'An Ninh'];

    const filteredServices = selectedCategory === 'Tất cả' 
        ? serviceList 
        : serviceList.filter(service => service.category === selectedCategory);

    const handleOpenAddServiceDialog = () => {
        setOpenAddServiceDialog(true);
    };

    const handleCloseAddServiceDialog = () => {
        setOpenAddServiceDialog(false);
    };

    const handleEditClick = (service: ServiceType) => {
        setServiceToEdit(service);
        setOpenEditServiceDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditServiceDialog(false);
        setServiceToEdit(null);
    };

    const handleDeleteClick = (service: ServiceType) => {
        setServiceToDelete(service);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setServiceToDelete(null);
    };

    const handleConfirmDelete = () => {
        // TODO: Xử lý xóa dịch vụ ở đây
        setOpenDeleteDialog(false);
        setServiceToDelete(null);
    };

    return (
        <div className="service-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Dịch Vụ Đám Cưới</h2>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        whiteSpace: 'nowrap',
                        borderRadius: '50px',
                        backgroundColor: '#4880FF',
                        '&:hover': {
                            backgroundColor: '#3a66cc',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                    onClick={handleOpenAddServiceDialog}
                >
                    Thêm dịch vụ
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

            <div className="service-grid" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
                justifyContent: 'flex-start',
            }}>
                {filteredServices.map((service: ServiceType) => (
                    <div key={service.id} className="service-card" style={{
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
                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleEditClick(service)}>
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
                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleDeleteClick(service)}>
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
                                    <DeleteIcon fontSize="small" sx={{ color: '#ff0000', opacity: 0.85, transition: 'opacity 0.2s' }} />
                                </Box>
                            </Button>
                        </div>
                        <img src={service.image} alt={service.name} className="service-image" />
                        <div className="service-info">
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <p className="service-price">{service.price.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                    </div>
                ))}
            </div>

            <ServiceAddDialog
                open={openAddServiceDialog}
                onClose={handleCloseAddServiceDialog}
                onSave={() => {}}
                categories={categories}
            />
            <ServiceEditDialog
                open={openEditServiceDialog}
                onClose={handleCloseEditDialog}
                service={serviceToEdit}
                categories={categories}
            />
            <ConfirmDelete
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
