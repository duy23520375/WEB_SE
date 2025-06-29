import { Box, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function StepCustomerInfo() {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '0px 10px',
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
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '20px',
            }}>Thông tin khách hàng</Typography>

            <Controller
                name="groom"
                control={control}
                rules={{ required: "Không được bỏ trống" }}
                render={({ field }) => (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                    }}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                            Tên chú rể
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Nhập tên chú rể"
                            {...field}
                            error={!!errors.groom}
                            helperText={errors.groom?.message}
                        />
                    </Box>
                )}
            />

            <Controller
                name="bride"
                control={control}
                rules={{ required: "Không được bỏ trống" }}
                render={({ field }) => (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                    }}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                            Tên cô dâu
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Nhập tên cô dâu"
                            {...field}
                            error={!!errors.bride}
                            helperText={errors.bride?.message}
                        />
                    </Box>
                )}
            />

            <Controller
                name="phone"
                control={control}
                rules={{
                    required: "Không được bỏ trống",
                    pattern: {
                        value: /^0\d{9}$/,
                        message: "Số điện thoại không hợp lệ"
                    }
                }}
                render={({ field }) => (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                    }}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                            Số điện thoại
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Nhập số điện thoại"
                            {...field}
                            type="tel"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Box>
                )}
            />
        </Box>
    );
}
