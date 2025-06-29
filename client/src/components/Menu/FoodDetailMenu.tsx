import {
    Dialog,
    DialogContent,
    Box,
    Typography,
} from "@mui/material";
import { defaultBgColorMap, defaultTextColorMap } from "../../assets/color/ColorMap";
import { IFood } from "../../interfaces/food.interface";
import { CircleDollarSign } from "lucide-react";
export default function FoodDetailMenu({
    open,
    onClose,
    initialData,
}: {
    open: boolean;
    onClose: () => void;
    initialData: IFood;
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
                            backgroundColor: defaultBgColorMap[initialData.category],
                            color: defaultTextColorMap[initialData.category],
                            fontWeight: 'bold',
                            fontSize: 16,
                            zIndex: 100
                        }}>
                            {initialData.category}
                        </Box>
                    </Box>

                    <Typography sx={{ fontSize: '18px', }}>
                        {initialData.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CircleDollarSign size={22} />
                        <Typography fontSize={18}>
                            {initialData.price.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog >
    );
}
