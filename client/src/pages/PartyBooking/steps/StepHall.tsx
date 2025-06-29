import { Box, Card, CardContent, CardMedia, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { defaultBgColorMap, defaultTextColorMap } from "../../../assets/color/ColorMap";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import HallDetailMenu from "../../../components/Menu/HallDetailMenu";

const halls = [
    {
        id: "1",
        name: "Sảnh Hồng",
        type: "A",
        maxTable: 30,
        minTablePrice: 1000000,
        description: "Không gian mở, view đẹp, thích hợp cho tiệc cưới ngoài trời và các buổi tiệc nhẹ nhàng.",
        image: 'https://picsum.photos/300/300',
    },
    {
        id: "2",
        name: "Sảnh Phượng",
        type: "B",
        maxTable: 40,
        minTablePrice: 1100000,
        description: "Thiết kế hiện đại, ánh sáng tự nhiên, lý tưởng cho các buổi tiệc thân mật và ấm cúng.",
        image: 'https://picsum.photos/400/300',
    },
    {
        id: "3",
        name: "Sảnh Mai",
        type: "E",
        maxTable: 100,
        minTablePrice: 1600000,
        description: "Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt.",
        image: 'https://picsum.photos/500/300',
    },
    {
        id: "4",
        name: "Sảnh Lan",
        type: "D",
        maxTable: 80,
        minTablePrice: 1400000,
        description: "Không gian sang trọng, sức chứa lớn, phù hợp cho các buổi tiệc cưới hoành tráng và sự kiện lớn.",
        image: 'https://picsum.photos/200/400',
    },
    {
        id: "5",
        name: "Sảnh Cúc",
        type: "E",
        maxTable: 90,
        minTablePrice: 1600000,
        description: "Thiết kế hiện đại, ánh sáng tự nhiên, lý tưởng cho các buổi tiệc thân mật và ấm cúng.",
        image: 'https://picsum.photos/200/100',
    },
    {
        id: "6",
        name: "Sảnh Sen",
        type: "A",
        maxTable: 40,
        minTablePrice: 1000000,
        description: "Không gian mở, view đẹp, thích hợp cho tiệc cưới ngoài trời và các buổi tiệc nhẹ nhàng.",
        image: 'https://picsum.photos/200/500',
    },
    {
        id: "7",
        name: "Sảnh Tùng",
        type: "B",
        maxTable: 50,
        minTablePrice: 1100000,
        description: "Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt.",
        image: 'https://picsum.photos/250/300',
    },
    {
        id: "8",
        name: "Sảnh Trúc",
        type: "C",
        maxTable: 60,
        minTablePrice: 1200000,
        description: "Phong cách cổ điển, trang trí tinh tế, phù hợp cho các buổi tiệc sang trọng và lịch lãm.",
        image: 'https://picsum.photos/200/350',
    },
    {
        id: "9",
        name: "Sảnh Đào",
        type: "D",
        maxTable: 90,
        minTablePrice: 1400000,
        description: "Không gian sang trọng, sức chứa lớn, phù hợp cho các buổi tiệc cưới hoành tráng và sự kiện lớn.",
        image: 'https://picsum.photos/150/300',
    },
    {
        id: "10",
        name: "Sảnh Lộc",
        type: "E",
        maxTable: 120,
        minTablePrice: 1600000,
        description: "Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt.",
        image: 'https://picsum.photos/200/450',
    }
];

const NullHall = {
    id: "",
    name: "",
    type: "A",
    maxTable: 0,
    minTablePrice: 0,
    description: "",
    image: '',
}

export default function StepHall() {
    const { watch, setValue, control } = useFormContext();
    const [searchKey, setSearchKey] = useState("");
    const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);

    const totalTables = (watch("tables") || 0) + (watch("reserveTables") || 0);
    const selectedDate = watch("date");
    const selectedShift = watch("shift");
    const selectedHall = watch("hall") || NullHall;

    const filteredHalls = halls.filter((hall) => {
        const matchesTables = hall.maxTable >= totalTables;
        return hall.name.toLowerCase().includes(searchKey.toLowerCase())
            && matchesTables;
    })

    return (
        <Box sx={{
            display: 'flex', gap: '20px', height: '100%'
        }}>
            {totalTables != 0 && selectedDate && selectedShift ?
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    pr: 1, // để tránh che mất scroll bar
                }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        rowGap: '20px',
                        columnGap: { sm: '3%', md: '2%' },
                        padding: '3px'
                    }}>
                        {filteredHalls.map((hall) => (
                            <Card
                                key={hall.id}
                                onClick={() => setValue("hall", hall)}
                                sx={{
                                    borderRadius: 3,
                                    cursor: "pointer",
                                    border:
                                        selectedHall?.id === hall.id
                                            ? "3px solid #4880FF"
                                            : "1px solid #ccc",
                                    boxShadow: selectedHall?.id === hall.id ? 4 : 1,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={hall.image}
                                    sx={{
                                        width: '100%',
                                        objectFit: 'cover',
                                        height: 200,
                                    }}
                                />
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Typography
                                            onClick={() => { setIsDetailMenuOpen(true) }}
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                '&:hover': {
                                                    color: '#4880FF',
                                                },
                                            }}
                                        >
                                            {hall.name}
                                        </Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            width: '25px',
                                            height: '25px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            backgroundColor: defaultBgColorMap[hall.type],
                                            color: defaultTextColorMap[hall.type],
                                            fontWeight: 'bold',
                                            zIndex: 100
                                        }}>
                                            {hall.type}
                                        </Box>
                                    </Box>

                                    <Typography sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: 'hidden',
                                        WebkitLineClamp: 2,
                                        color: 'GrayText',
                                        fontSize: '14px',
                                        height: '45px',
                                    }}>
                                        {hall.description}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TableRestaurantIcon sx={{ fontSize: '1rem', mr: 0.5, }} />
                                            <Typography color="text.secondary" fontSize={14}>
                                                Tối đa: {hall.maxTable} bàn
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TableRestaurantIcon sx={{ fontSize: '1rem', mr: 0.5, }} />
                                            <Typography color="text.secondary" fontSize={14}>
                                                Đơn giá bàn tối thiểu: {hall.minTablePrice.toLocaleString('vi-VN')} VND
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
                : <Typography sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: "gray",
                }}>
                    Vui lòng nhập thông tin
                </Typography>
            }

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '170px', md: '300px' },
                gap: '15px',
                padding: '2px'
            }}>
                <SearchBar
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />

                <Controller
                    name="tables"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Số lượng bàn:
                            </Typography>
                            <TextField
                                type="number"
                                sx={{
                                    width: '90px',
                                    "& fieldset": {
                                        borderRadius: "10px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "8px 10px",
                                    },
                                }}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        </Box>
                    )}
                />

                <Controller
                    name="reserveTables"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Số bàn dự trữ:
                            </Typography>
                            <TextField
                                type="number"
                                sx={{
                                    width: '90px',
                                    "& fieldset": {
                                        borderRadius: "10px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "8px 10px",
                                    },
                                }}
                                {...field}

                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        </Box>
                    )}
                />
                <Controller
                    name="shift"
                    control={control}
                    defaultValue="Trưa"
                    render={({ field }) => (
                        <FormControl sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            "& fieldset": {
                                borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": {
                                display: 'flex',
                                alignItems: 'center',
                                paddingY: '6px',
                                paddingLeft: "13px",
                                backgroundColor: '#fff',
                            },
                        }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Ca:
                            </Typography>
                            <Select
                                {...field}
                                sx={{ width: '90px', }}
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
                                {["Trưa", "Tối"].map((item) =>
                                    <MenuItem value={item}
                                        sx={{
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'inline-flex',
                                            paddingX: '7px',
                                            paddingY: '2px',
                                            borderRadius: '6px',
                                            backgroundColor: defaultBgColorMap[item],
                                            color: defaultTextColorMap[item],
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            zIndex: 100,
                                        }}>
                                            {item}
                                        </Box>
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="date"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <FormControl sx={{
                                gap: '3px'
                            }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    Ngày tổ chức
                                </Typography>
                                <DatePicker
                                    {...field}
                                    format="DD/MM/YYYY"
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(value) => field.onChange((value?.toDate() || new Date()).toString())}
                                    sx={{
                                        "& .MuiPickersInputBase-root": {
                                            backgroundColor: '#fff',
                                            borderRadius: "10px",
                                            gap: '5px',
                                            '& .MuiPickersOutlinedInput-root.Mui-error .MuiPickersOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0, 0, 0, 0.23)'
                                            }
                                        },
                                        "& .MuiPickersSectionList-root": {
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: '50px',
                                            paddingY: '0px',
                                        },
                                    }}
                                    slotProps={{
                                        popper: {
                                            sx: {
                                                '& .MuiPaper-root': {
                                                    borderRadius: '20px',
                                                },
                                                '& .MuiDateCalendar-root': {
                                                    padding: '18px 20px',
                                                    gap: '10px',
                                                    maxHeight: '360px',
                                                    height: 'auto',
                                                    width: '310px'
                                                },
                                                '& .MuiPickersCalendarHeader-root': {
                                                    padding: '0 8px',
                                                    margin: 0,
                                                    justifyContent: 'space-between',
                                                },
                                                '& .MuiPickersCalendarHeader-labelContainer': {
                                                    color: '#202224',
                                                    fontWeight: 600,
                                                    fontSize: '15px',
                                                    margin: 0,
                                                },
                                                '& .MuiPickersArrowSwitcher-root': {
                                                    gap: '5px'
                                                },
                                                '& .MuiPickersArrowSwitcher-button': {
                                                    padding: 0,
                                                    backgroundColor: '#e7e9ee',
                                                    borderRadius: '5px'
                                                },
                                                '& .MuiTypography-root': {
                                                    color: '#454545',
                                                },
                                                '& .MuiDayCalendar-slideTransition': {
                                                    minHeight: 0,
                                                    marginBottom: '4px'
                                                },
                                            },

                                        },
                                        day: {
                                            sx: {
                                                color: "#8f9091",
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: '#e3f2fd',
                                                },
                                                '&.MuiPickersDay-root.Mui-selected': {
                                                    backgroundColor: '#4880FF',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#4880FF'
                                                    }
                                                },
                                            },
                                        },
                                    }}
                                />
                            </FormControl>
                        </LocalizationProvider>
                    )}
                />
            </Box>

            <HallDetailMenu
                open={isDetailMenuOpen}
                onClose={() => setIsDetailMenuOpen(false)}
                initialData={selectedHall}
            />
        </Box>
    );
}
