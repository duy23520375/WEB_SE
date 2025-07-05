import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

interface IHallInfo {
    _id: string,
    TENSANH: string;
    LOAISANH: string;
    SOLUONGBANTD: number;
    DONGIABANTT: number;
    GHICHU: string;
    image?: string;
}

interface EditHallDialogProps {
    open: boolean;
    onClose: () => void;
    hall: IHallInfo | null;
    hallTypes: string[];
    onUpdateHall: (hall: IHallInfo) => void;
}

const EditHallDialog: React.FC<EditHallDialogProps> = ({ open, onClose, hall, hallTypes,onUpdateHall }) => {
    const [name, setName] = React.useState(hall?.TENSANH || "");
    const [type, setType] = React.useState(hall?.LOAISANH || "");
    const [maxTables, setMaxTables] = React.useState(hall?.SOLUONGBANTD?.toString() || "");
    const [price, setPrice] = React.useState(hall?.DONGIABANTT?.toString() || "");
    const [note, setNote] = React.useState(hall?.GHICHU || "");

    React.useEffect(() => {
        setName(hall?.TENSANH || "");
        setType(hall?.LOAISANH || "");
        setMaxTables(hall?.SOLUONGBANTD?.toString() || "");
        setPrice(hall?.DONGIABANTT?.toString() || "");
        setNote(hall?.GHICHU || "");
    }, [hall]);

    const handleSave = async () => {
        if (!hall) return;
        const updatedHall: IHallInfo = {
            ...hall,
            TENSANH: name,
            LOAISANH: type,
            SOLUONGBANTD: Number(maxTables),
            DONGIABANTT: Number(price),
            GHICHU: note,
        };
        await fetch(`http://localhost:3000/api/sanh/${hall._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedHall),
        });
        onUpdateHall(updatedHall);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa thông tin sảnh</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Tên Sảnh"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel>Loại Sảnh</InputLabel>
                    <Select
                        label="Loại Sảnh"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        {hallTypes.map((t) => (
                            <MenuItem key={t} value={t}>{`Loại ${t}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Số Lượng Bàn Tối Đa"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={maxTables}
                    onChange={e => setMaxTables(e.target.value)}
                />
                <TextField
                    label="Đơn Giá Bàn Tối Thiểu"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <TextField
                    label="Ghi Chú"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                        Lưu
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditHallDialog;