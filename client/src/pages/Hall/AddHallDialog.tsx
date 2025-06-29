import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
// Nếu cần dùng IHallInfo hoặc hallInfo thì import từ './hallInfo.mock';

interface AddHallDialogProps {
    open: boolean;
    onClose: () => void;
    hallTypes: string[];
    onAddHall: (hall: any) => void;
}

const AddHallDialog: React.FC<AddHallDialogProps> = ({ open, onClose, hallTypes,onAddHall }) => {
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [maxTables, setMaxTables] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [note, setNote] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/sanh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    MASANH: Date.now().toString(),
                    TENSANH: name,
                    LOAISANH: type,
                    SOLUONGBANTD: Number(maxTables),
                    DONGIABANTT: Number(price),
                    GHICHU: note
                })
            });
            if (!res.ok) throw new Error("Lỗi khi thêm sảnh");
            const newHall = await res.json(); // Lấy dữ liệu sảnh mới từ server
            onAddHall(newHall); // Gọi callback để cập nhật danh sách
            setName(""); setType(""); setMaxTables(""); setPrice(""); setNote("");
            onClose();
        } catch (err) {
            alert("Thêm sảnh thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            BackdropProps={{
                style: { backdropFilter: 'blur(5px)' }
            }}
        >
            <DialogTitle>Thêm sảnh mới</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên Sảnh" variant="outlined" fullWidth value={name} onChange={e => setName(e.target.value)} />
                <FormControl fullWidth>
                    <InputLabel>Loại Sảnh</InputLabel>
                    <Select label="Loại Sảnh" value={type} onChange={e => setType(e.target.value)}>
                        {hallTypes.map((t) => (
                            <MenuItem key={t} value={t}>{`Loại ${t}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Số Lượng Bàn Tối Đa" variant="outlined" type="number" fullWidth value={maxTables} onChange={e => setMaxTables(e.target.value)} />
                <TextField label="Đơn giá" variant="outlined" fullWidth value={price} onChange={e => setPrice(e.target.value)} />
                <TextField label="Ghi Chú" variant="outlined" multiline rows={4} fullWidth value={note} onChange={e => setNote(e.target.value)} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary" disabled={loading}>
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={handleSave} disabled={loading || !name || !type || !maxTables || !price}>
                        {loading ? "Đang lưu..." : "Lưu"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddHallDialog;