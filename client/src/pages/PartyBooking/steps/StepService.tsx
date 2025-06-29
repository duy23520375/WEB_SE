import { Box, Card, CardContent, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { CircleDollarSign } from "lucide-react";
import { Close } from "@mui/icons-material";
import { IService, IServiceBooking } from "../../../interfaces/service.interface";
import ServiceDetailMenu from "../../../components/Menu/ServiceDetailMenu";

const services: IService[] = [
    {
        id: '1',
        name: "Trang Trí Sảnh Tiệc",
        description: "Trang trí sảnh tiệc với hoa tươi, bóng bay, backdrop và các phụ kiện trang trí",
        price: 15000000,
        image: "https://nhahanghuonglieusunflower.com/wp-content/uploads/2023/06/Trang-tri-sanh-tiec-cuoi-1.jpg",
    },
    {
        id: '2',
        name: "Trang Trí Bàn Tiệc",
        description: "Trang trí bàn tiệc với khăn trải bàn, hoa tươi, nến và các phụ kiện",
        price: 500000,
        image: "https://cdn.tgdd.vn/2021/12/CookDishThumb/cach-trang-tri-ban-tiec-ngot-doc-dao-moi-la-ap-dung-duoc-cho-thumb-620x620.jpg",
    },
    {
        id: '3',
        name: "Trang Trí Lễ Đường",
        description: "Trang trí lễ đường với hoa tươi, backdrop và các phụ kiện trang trí",
        price: 10000000,
        image: "https://tse1.mm.bing.net/th/id/OIP.-puz0hvMSoSpr8ow03r1RwEyDM?rs=1&pid=ImgDetMain",
    },
    {
        id: '4',
        name: "MC Chuyên Nghiệp",
        description: "MC dẫn chương trình đám cưới chuyên nghiệp, có kinh nghiệm",
        price: 5000000,
        image: "https://webdamcuoi.com/wp-content/uploads/2022/01/mc-dam-cuoi-1024x570.jpg",
    },
    {
        id: '5',
        name: "Ca Sĩ Hát Live",
        description: "Ca sĩ hát live tại đám cưới với nhạc cụ",
        price: 8000000,
        image: "https://tse2.mm.bing.net/th/id/OIP.RJBQRtjbja59537YUUsmegHaE7?rs=1&pid=ImgDetMain",
    },
    {
        id: '6',
        name: "Ban Nhạc Sống",
        description: "Ban nhạc sống biểu diễn tại đám cưới",
        price: 12000000,
        image: "https://tse3.mm.bing.net/th/id/OIP.kM2F15lLcH9e4RdqCzMDnwHaE7?rs=1&pid=ImgDetMain",
    },
    {
        id: '7',
        name: "Quay Phim Chuyên Nghiệp",
        description: "Quay phim đám cưới với máy quay chuyên nghiệp",
        price: 15000000,
        image: "https://tse4.mm.bing.net/th/id/OIP.gx2kWyON409-DaK5YOpORAHaEi?rs=1&pid=ImgDetMain",
    },
    {
        id: '8',
        name: "Chụp Ảnh Cưới",
        description: "Chụp ảnh cưới với nhiếp ảnh gia chuyên nghiệp",
        price: 10000000,
        image: "https://toplist.vn/images/800px/ah-studio-692689.jpg",
    },
    {
        id: '9',
        name: "Trang Điểm Cô Dâu",
        description: "Trang điểm cô dâu với chuyên gia trang điểm",
        price: 5000000,
        image: "https://th.bing.com/th/id/R.1b26497fc5b8d280cef2e540e1f58639?rik=NcCaAEts4QRg0Q&pid=ImgRaw&r=0",
    },
    {
        id: '10',
        name: "Làm Tóc Cô Dâu",
        description: "Làm tóc cô dâu với chuyên gia tạo mẫu tóc",
        price: 3000000,
        image: "https://erocante.vn/wp-content/uploads/2021/01/kieu-toc-cho-co-dau-mat-dai.jpg",
    },
    {
        id: '11',
        name: "Áo Dài Cưới",
        description: "Cho thuê áo dài cưới truyền thống",
        price: 2000000,
        image: "https://th.bing.com/th/id/R.e1c951e3746adb79924709cf649c2f39?rik=xKA8HSRnShOAZg&pid=ImgRaw&r=0",
    },
    {
        id: '12',
        name: "Vest Cưới",
        description: "Cho thuê vest cưới cho chú rể",
        price: 1500000,
        image: "https://th.bing.com/th/id/R.d5124a32bd990d59da2ad88db0d581dc?rik=0R8AcCkW8Ypwww&pid=ImgRaw&r=0",
    },
    {
        id: '13',
        name: "Xe Hoa",
        description: "Cho thuê xe hoa trang trí đẹp mắt",
        price: 5000000,
        image: "https://tse3.mm.bing.net/th/id/OIP.YwPx-ViAOArJbQ6sXgoIBwHaEo?rs=1&pid=ImgDetMain",
    },
    {
        id: '14',
        name: "Xe Đưa Đón Khách",
        description: "Dịch vụ xe đưa đón khách mời",
        price: 3000000,
        image: "https://th.bing.com/th/id/R.e6abef4f975a33a350b55c4b81176466?rik=wPENk0iummvS7A&pid=ImgRaw&r=0",
    },
    {
        id: '15',
        name: "Thiệp Cưới",
        description: "Thiết kế và in thiệp cưới",
        price: 100000,
        image: "https://kalina.com.vn/wp-content/uploads/2022/04/nhung-mau-thiep-cuoi-dep-khong-the-bo-qua-trong-ngay-cuoi-25.jpg",
    },
    {
        id: '16',
        name: "Hộp Quà Cưới",
        description: "Thiết kế và làm hộp quà cưới",
        price: 50000,
        image: "https://tse3.mm.bing.net/th/id/OIP.4-Lx4G02W-_dZbPUFQcxqgHaHa?rs=1&pid=ImgDetMain",
    },
    {
        id: '17',
        name: "Bánh Cưới",
        description: "Đặt bánh cưới nhiều tầng",
        price: 3000000,
        image: "https://product.hstatic.net/200000449489/product/i19__16__a49594884474402cae57254df15b50ee_master.jpg",
    },
    {
        id: '18',
        name: "Rượu Vang",
        description: "Cung cấp rượu vang cho tiệc cưới",
        price: 2000000,
        image: "https://vuanhabep.com.vn/wp-content/uploads/2022/07/ly-ruou-cuoi-1.jpg",
    },
    {
        id: '19',
        name: "Bảo Vệ",
        description: "Dịch vụ bảo vệ cho đám cưới",
        price: 2000000,
        image: "https://th.bing.com/th/id/OIP.SE6YLJpAN5o_asn62rKwxwHaE8?w=290&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
        id: '20',
        name: "Y Tế",
        description: "Dịch vụ y tế tại đám cưới",
        price: 1500000,
        image: "https://th.bing.com/th/id/OIP.1XRMBkS2H0HoS5lK_o0Q2gHaEK?w=295&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    }
];

const NullService = {
    id: '',
    name: "",
    description: "",
    price: 0,
    image: "",
}

export default function StepService() {
    const { watch, setValue } = useFormContext();
    const [searchKey, setSearchKey] = useState("");
    const [serviceDetail, setServiceDetail] = useState(NullService);
    const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<IServiceBooking[]>(watch("services") || []);

    useEffect(() => {
        setValue("services", selectedServices);
    }, [selectedServices]);

    const totalServicesPrice = selectedServices.reduce((sum, item) => sum + item.price, 0);

    const filteredServices = services.filter((service) => {
        return service.name.toLowerCase().includes(searchKey.toLowerCase());
    })

    const handleSelectService = (service: IService) => {
        setSelectedServices((prev) => {
            if (prev.some(item => item.serviceId === service.id)) return prev;
            return [...prev, {
                ...service,
                serviceId: service.id,
                quantity: 1,
                note: "",
            }];
        });
    };

    const handleDeleteService = (deleteId: string) => {
        const updatedServices = selectedServices.filter(s => s.serviceId !== deleteId);
        setSelectedServices(updatedServices);
    };

    const handleChangeNote = (serviceId: string, note: string) => {
        setSelectedServices((prev) =>
            prev.map(item =>
                item.serviceId === serviceId ? { ...item, note } : item
            )
        );
    };

    const handleChangeQuantity = (serviceId: string, quantity: number) => {
        setSelectedServices((prev) =>
            prev.map(item =>
                item.serviceId === serviceId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <Box sx={{
            display: 'flex', gap: '20px', height: '100%'
        }}>
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
                    padding: '3px',
                }}>
                    {filteredServices.map((service) => (
                        <Card
                            key={service.id}
                            onClick={() => { handleSelectService(service) }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                cursor: "pointer",
                                border:
                                    selectedServices.some(s => s.serviceId === service.id)
                                        ? "3px solid #4880FF"
                                        : "1px solid #ccc",
                                boxShadow: selectedServices.some(s => s.serviceId === service.id) ? 4 : 1,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={service.image}
                                sx={{
                                    width: '100%',
                                    objectFit: 'cover',
                                    height: 200,
                                }}
                            />
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '10px',
                                flexGrow: 1
                            }}>
                                <Typography
                                    onClick={() => {
                                        setServiceDetail(service);
                                        setIsDetailMenuOpen(true);
                                    }}
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        '&:hover': {
                                            color: '#4880FF',
                                        },
                                    }}
                                >
                                    {service.name}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                    <Typography sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: 'hidden',
                                        WebkitLineClamp: 2,
                                        color: 'GrayText',
                                        fontSize: '14px',
                                        height: '45px',
                                    }}>
                                        {service.description}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <CircleDollarSign size="18px" />
                                        <Typography color="text.secondary" fontSize={14}>
                                            {service.price.toLocaleString('vi-VN')} VND
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

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
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                }}>Dịch vụ đã chọn</Typography>

                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: '7px',
                    padding: '2px',
                    overflowY: 'auto',
                    pr: 1, // để tránh che mất scroll bar
                }}>
                    {selectedServices.map((item) => (
                        <Box
                            key={item.serviceId}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderRadius: 3,
                                boxShadow: 3
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                padding: '15px 20px',
                            }}>
                                <Typography sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                }}>
                                    {item.name}
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <Typography sx={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                    }}>
                                        Số lượng:
                                    </Typography>

                                    <TextField
                                        value={item.quantity}
                                        onChange={(e) => handleChangeQuantity(item.serviceId, Number(e.target.value))}
                                        type="number"
                                        defaultValue={1}
                                        slotProps={{ htmlInput: { min: 1 } }}
                                        sx={{
                                            width: '70px',
                                            "& fieldset": {
                                                borderRadius: "10px",
                                            },
                                            "& .MuiInputBase-input": {
                                                padding: "8px 10px",
                                            },
                                        }}
                                    />
                                </Box>

                                <TextField
                                    value={item.note}
                                    onChange={(e) => handleChangeNote(item.serviceId, e.target.value)}
                                    placeholder="Ghi chú"
                                    multiline
                                    minRows={1}
                                    variant="standard"
                                />
                            </Box>
                            <IconButton
                                sx={{ height: 'fit-content' }}
                                onClick={() => { handleDeleteService(item.serviceId) }}
                            >
                                <Close sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Box>
                    ))}
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    marginBottom: '7px',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Tổng tiền dịch vụ:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: 'green',
                        }}>
                            {totalServicesPrice.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <ServiceDetailMenu
                open={isDetailMenuOpen}
                onClose={() => setIsDetailMenuOpen(false)}
                initialData={serviceDetail}
            />
        </Box>
    );
}
