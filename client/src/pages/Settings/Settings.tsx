import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Switch,
  Container,
  Divider,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';

export default function Settings() {
  // State for penalty switch, initialize from localStorage if available
  const [usePenaltyRegulations, setUsePenaltyRegulations] = useState(() => {
    const stored = localStorage.getItem('penaltyRuleEnabled');
    return stored === null ? false : stored === 'true';
  });
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [darkMode, setDarkMode] = useState('system');

  // Whenever the switch changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('penaltyRuleEnabled', usePenaltyRegulations ? 'true' : 'false');
  }, [usePenaltyRegulations]);

  // Để lấy giá trị này ở nơi khác:
  // const penaltyRuleEnabled = localStorage.getItem('penaltyRuleEnabled') === 'true';

  return (
    <Box sx={{ background: '#f5f6fa', minHeight: '100vh', p: 0 }}>
      <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', maxWidth: 1400, mx: 'auto', width: '100%' }}>
        {/* Header */}
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 700, color: '#222', mb: 1, ml: 1 }}
        >
          Cài đặt
        </Typography>
        <Divider sx={{ mb: 4, mx: 1 }} />

        {/* Nhóm: Trải nghiệm */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, ml: 1 }}>
          Trải nghiệm
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 1 }}>
          <Typography>Sử dụng quy định phạt</Typography>
          <Switch checked={usePenaltyRegulations} onChange={e => setUsePenaltyRegulations(e.target.checked)} color="primary" />
        </Box>
        {usePenaltyRegulations && (
          <Box sx={{ px: 3, py: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Thanh toán trễ phạt 1% / 1 ngày
            </Typography>
          </Box>
        )}
        <Divider sx={{ my: 2, mx: 1 }} />

        {/* Nhóm: Giao diện */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, ml: 1 }}>
          Giao diện
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 1 }}>
          <Typography>Chế độ tối</Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={darkMode}
              onChange={e => setDarkMode(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="system">Theo hệ thống</MenuItem>
              <MenuItem value="light">Sáng</MenuItem>
              <MenuItem value="dark">Tối</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ my: 2, mx: 1 }} />

        {/* Nhóm: Ngôn ngữ */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, ml: 1 }}>
          Ngôn ngữ
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
          <Typography>Hiển thị phát âm</Typography>
          <Switch checked={showPronunciation} onChange={e => setShowPronunciation(e.target.checked)} color="primary" />
        </Box>
      </Box>
    </Box>
  );
}