import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Select,
    MenuItem,
    Typography,
    FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { defaultBgColorMap, defaultTextColorMap } from "../../assets/color/ColorMap";
export default function HallEditForm({
    open,
    onClose,
    initialData,
}: {
    open: boolean;
    onClose: () => void;
    initialData?: any;
}) {
    const [form, setForm] = useState({
        id: 0,
        name: '',
        type: '',
        maxTable: 0,
        minTablePrice: 0,
        description: '',
        image: '',
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm({
            id: 0,
            name: '',
            type: '',
            maxTable: 0,
            minTablePrice: 0,
            description: '',
            image: '',
        });
    }, [initialData]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiPaper-root': {
                    padding: '26px 4px',
                    borderRadius: '15px',
                    maxWidth: '700px',
                },
                '& .MuiDialogContent-root': {
                    padding: 0,
                },
                "& fieldset": {
                    borderRadius: "10px",
                },
                "& .MuiInputBase-input": {
                    padding: "15px 10px",
                    fontSize: "16px",
                    "&::placeholder": {
                        color: "#a5bed4",
                        opacity: 1,
                    },
                },
            }}
        >
            <DialogTitle sx={{
                padding: '8px 24px',
                paddingTop: '0px',
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                {initialData ?
                    "Cập nhật thông tin sảnh"
                    : "Thêm sảnh"
                }
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '15px 24px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Tên sảnh
                        </Typography>
                        <TextField fullWidth value={form.name}
                            placeholder="Nhập tên sảnh"
                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </Box>


                    <FormControl fullWidth sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Loại sảnh
                        </Typography>
                        <Select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            displayEmpty
                            sx={{
                                height: '61px',
                                "& .MuiSelect-icon": {
                                    color: "var(--text-color)",
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        boxSizing: 'border-box',
                                        padding: "0 8px",
                                        border: "1px solid #e4e4e7",
                                        "& .MuiMenuItem-root": {
                                            borderRadius: "6px",
                                            "&:hover": {
                                                backgroundColor: "rgba(117, 126, 136, 0.08)",
                                            },
                                            "&.Mui-selected": {
                                                backgroundColor: "#bcd7ff",
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Chọn loại sảnh     {/* placeholder */}
                            </MenuItem>
                            {["A", "B", "C", "D", "E"].map((item) => (
                                <MenuItem value={item}
                                    sx={{
                                    }}
                                >
                                    <Box sx={{
                                        display: 'inline-flex',
                                        paddingX: 1.5,
                                        paddingY: 0.5,
                                        borderRadius: 2,
                                        backgroundColor: defaultBgColorMap[item],
                                        color: defaultTextColorMap[item],
                                        fontWeight: 'bold',
                                    }}>
                                        {item}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số lượng bàn tối đa
                        </Typography>
                        <TextField fullWidth value={form.maxTable}
                            placeholder="Nhập số lượng bàn tối đa"
                            onChange={(e) => setForm({ ...form, maxTable: Number(e.target.value) })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Ghi chú
                        </Typography>
                        <TextField fullWidth value={form.description}
                            placeholder="Nhập ghi chú"
                            onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{
                alignSelf: 'center',
                paddingTop: '16px',
                paddingBottom: '0px',
                gap: '10px',
            }}>
                <Button onClick={onClose}
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: 'var(--text-color)',
                        textTransform: "none",
                    }}
                >
                    Huỷ
                </Button>
                <Button
                    variant="contained"
                    onClick={() => { }}
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: '8px',
                        backgroundColor: "#4880FF",
                        textTransform: "none",
                    }}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog >
    );
}
