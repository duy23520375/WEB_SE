import {
    Dialog,
    DialogContent,
    Box,
    Typography,
} from "@mui/material";
import { IService } from "../../interfaces/service.interface";
import { CircleDollarSign } from "lucide-react";
export default function ServiceDetailMenu({
    open,
    onClose,
    initialData,
}: {
    open: boolean;
    onClose: () => void;
    initialData: IService;
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
                    <Typography sx={{ fontSize: '26px', fontWeight: 'bold' }}>
                        {initialData.name}
                    </Typography>

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
