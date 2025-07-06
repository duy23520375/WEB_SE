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
import { formatDate } from "../../utils/formatDate";

export default function PartyForm({
    open,
    onClose,
    onSubmit,
    onExportBill,
    initialData,
    readOnly,
    hallName,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    onExportBill: (partyData: any) => void;
    initialData?: any;
    readOnly: boolean;
    hallName: string;
}) {
    const [form, setForm] = useState({
        id: 0,
        groom: "",
        bride: "",
        phone: "",
        date: "",
        shift: "",
        hall: "",
        deposit: 0,
        tables: 0,
        reserveTables: 0,
        status: "Đã đặt cọc",
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm({
            id: 0,
            groom: "",
            bride: "",
            phone: "",
            date: "",
            shift: "",
            hall: "",
            deposit: 0,
            tables: 0,
            reserveTables: 0,
            status: "Đã đặt cọc",
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
                {readOnly ?
                    "Thông tin tiệc"
                    : initialData && "Cập nhật thông tin tiệc"
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
                            Tên chú rể
                        </Typography>
                        <TextField fullWidth value={form.groom}
                            placeholder="Nhập tên chú rể"
                            disabled={readOnly}
                            onChange={(e) => setForm({ ...form, groom: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Tên cô dâu
                        </Typography>
                        <TextField fullWidth value={form.bride}
                            placeholder="Nhập tên tô dâu"
                            disabled={readOnly}
                            onChange={(e) => setForm({ ...form, bride: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số điện thoại
                        </Typography>
                        <TextField fullWidth value={form.phone}
                            placeholder="Nhập số điện thoại"
                            disabled={readOnly}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: ({ xs: 'column', sm: 'row', }),
                        gap: '18px',
                    }}>
                        <FormControl fullWidth sx={{
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Ngày tổ chức
                            </Typography>
                            <TextField
                                fullWidth
                                value={formatDate(form.date)}
                                disabled={true} />
                        </FormControl>

                        <FormControl fullWidth sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Ca
                            </Typography>
                            <TextField
                                fullWidth
                                value={form.shift}
                                disabled={true} />
                        </FormControl>

                        <FormControl fullWidth sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Sảnh
                            </Typography>
                            <TextField
                                fullWidth
                                value={hallName}
                                disabled={true} />
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Tiền cọc
                        </Typography>
                        <TextField fullWidth value={form.deposit}
                            placeholder="Nhập tiền cọc"
                            disabled={true}
                            onChange={(e) => setForm({ ...form, deposit: Number(e.target.value) })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số lượng bàn
                        </Typography>
                        <TextField fullWidth value={form.tables}
                            placeholder="Nhập số lượng bàn"
                            disabled={true}
                            onChange={(e) => setForm({ ...form, tables: Number(e.target.value) })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số bàn dự trữ
                        </Typography>
                        <TextField fullWidth value={form.reserveTables}
                            placeholder="Nhập số bàn dự trữ"
                            disabled={true}
                            onChange={(e) => setForm({ ...form, reserveTables: Number(e.target.value) })} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Trạng thái
                        </Typography>
                        {(!readOnly && form.status === 'Đã đặt cọc') ? ( 
                        <Select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            disabled={readOnly}
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
                            <MenuItem value="Đã đặt cọc">Đã đặt cọc</MenuItem>
                            <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
                            <MenuItem value="Đã huỷ">Đã huỷ</MenuItem>
                        </Select>

                        ) : (

                        // Khi đã ở “Đã thanh toán” hoặc “Đã huỷ”, hoặc đang xem readOnly
                        <Typography sx={{ lineHeight: '61px' }}>
                        {form.status}
                        </Typography>
                    )}                           
                    </Box>

                </Box>
            </DialogContent>

            {!readOnly &&
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
                    {/* <Button
                        variant="contained"
                        onClick={() => onExportBill?.(form)}
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            borderRadius: '8px',
                            backgroundColor: "#4880FF",
                            textTransform: "none",
                        }}
                    >
                        Xuất hóa đơn
                    </Button> */}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            console.log("DỮ LIỆU GỬI LÊN:", form); // ✅ thêm dòng này

                            onSubmit(form);
                        }}
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            borderRadius: '8px',
                            backgroundColor: "#4caf50",
                            textTransform: "none",
                        }}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            }
        </Dialog>
    );
}
