import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Link,
    IconButton,
    InputAdornment,
    Alert,
    MenuItem, // For dropdown
    FormControl,
    InputLabel,
    Select, // For dropdown
    SelectChangeEvent, // Thêm SelectChangeEvent vào đây
} from '@mui/material';
const RegisterPage: React.FC = () => {
    const [registerData, setRegisterData] = useState({
        fullName: '',
        phoneNumber: '',
        otp: '',
        password: '',
        confirmPassword: '',
        role: '',
        weddingDate: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const roles = ['Cô dâu', 'Chú rể', 'Người thân', 'Bạn bè']; // Ví dụ các vai trò

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name as string]: value
        }));
        if (registerError) {
            setRegisterError('');
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const validateRegisterData = () => {
        if (!registerData.fullName.trim()) {
            setRegisterError('Vui lòng nhập họ và tên');
            return false;
        }
        if (!registerData.phoneNumber.trim()) {
            setRegisterError('Vui lòng nhập số điện thoại');
            return false;
        }
        if (!/^[0-9]{10}$/.test(registerData.phoneNumber)) {
            setRegisterError('Số điện thoại không hợp lệ');
            return false;
        }
        if (!registerData.password) {
            setRegisterError('Vui lòng nhập mật khẩu');
            return false;
        }
        if (registerData.password.length < 6) {
            setRegisterError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        if (registerData.password !== registerData.confirmPassword) {
            setRegisterError('Mật khẩu xác nhận không khớp');
            return false;
        }
        if (!registerData.role) {
            setRegisterError('Vui lòng chọn vai trò');
            return false;
        }
        if (!registerData.weddingDate) {
            setRegisterError('Vui lòng chọn ngày tổ chức tiệc cưới dự kiến');
            return false;
        }
        return true;
    };

    const handleSubmitRegister = () => {
        setRegisterError('');
        if (validateRegisterData()) {
            console.log('Đăng ký với dữ liệu:', registerData);
            // Logic xử lý đăng ký thực tế (gọi API, lưu DB, v.v.)
            // Sau khi đăng ký thành công, có thể chuyển hướng về trang đăng nhập
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Đăng Ký
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                    {registerError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {registerError}
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Họ và tên"
                        name="fullName"
                        value={registerData.fullName}
                        onChange={handleRegisterChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Số điện thoại"
                        name="phoneNumber"
                        value={registerData.phoneNumber}
                        onChange={handleRegisterChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={handleClickShowPassword}
                                        onClick={handleMouseDownPassword}
                                        edge="end"
                                    >

                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Bạn sẽ là? *</InputLabel>
                        <Select
                            label="Bạn sẽ là? *"
                            name="role"
                            value={registerData.role}
                            onChange={handleRegisterChange}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: '#4880FF', // Màu xanh
                            color: '#808080', // Màu chữ xám đậm
                            '&:hover': {
                                bgcolor: '#DCDCDC',
                                cursor: 'default',
                            },
                        }}
                        onClick={handleSubmitRegister}
                    >
                        Đăng Ký
                    </Button>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        Đã có tài khoản?
                        <Link href="/login" variant="body2" sx={{ color: '#4880FF' }}>
                            Đăng Nhập
                        </Link>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Bằng việc tiếp tục đăng ký, bạn đã đồng ý với 
                            <Link href="#" sx={{ color: '#4880FF', ml: 0.5 }}>Điều khoản và Chính sách quyền riêng tư</Link> của chúng tôi
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage; 