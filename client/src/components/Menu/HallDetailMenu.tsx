import {
    Dialog,
    DialogContent,
    Box,
    Typography,
} from "@mui/material";
import { defaultBgColorMap, defaultTextColorMap } from "../../assets/color/ColorMap";
import { IHall } from "../../interfaces/hall.interface";
import { TableRestaurant } from "@mui/icons-material";
export default function HallDetailMenu({
    open,
    onClose,
    initialData,
}: {
    open: boolean;
    onClose: () => void;
    initialData: IHall;
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiPaper-root': {
                    paddingBottom: 2,
                    borderRadius: '15px',
                    maxWidth: '700px',
                },
                '& .MuiDialogContent-root': {
                    padding: 0,
                },
            }}
        >
            <DialogContent sx={{ scrollbarWidth: 'none' }}>
                <Box
                    component="img"
                    src={initialData.image}
                    sx={{
                        height: 350,
                        width: '100%',
                    }}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '15px 24px'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '26px', fontWeight: 'bold' }}>
                            {initialData.name}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            padding: '4px 12px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            backgroundColor: defaultBgColorMap[initialData.type],
                            color: defaultTextColorMap[initialData.type],
                            fontWeight: 'bold',
                            fontSize: 16,
                            zIndex: 100
                        }}>
                            Sảnh loại {initialData.type}
                        </Box>
                    </Box>

                    <Typography sx={{ fontSize: '18px', }}>
                        {initialData.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TableRestaurant sx={{ fontSize: 20, mr: 2, }} />
                        <Typography fontSize={18}>
                            Tối đa: {initialData.maxTable} bàn
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TableRestaurant sx={{ fontSize: 20, mr: 2, }} />
                        <Typography fontSize={18}>
                            Đơn giá bàn tối thiểu: {initialData.minTablePrice.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog >
    );
}
