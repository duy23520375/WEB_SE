import { Box, Card, CardContent, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { defaultBgColorMap, defaultTextColorMap } from "../../../assets/color/ColorMap";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { CircleDollarSign } from "lucide-react";
import { IFood, IFoodBooking } from "../../../interfaces/food.interface";
import { Close } from "@mui/icons-material";
import FoodDetailMenu from "../../../components/Menu/FoodDetailMenu";

const foods: IFood[] = [
    // Món khai vị
    {
        id: '1',
        name: "Gỏi Ngó Sen Tôm Thịt",
        description: "Gỏi ngó sen giòn với tôm và thịt heo, nước mắm pha",
        price: 120000,
        image: "https://th.bing.com/th/id/R.fe32da71966e285154bb1f967e62f57c?rik=1wjVn1NbcVvnEg&pid=ImgRaw&r=0",
        category: "Món khai vị"
    },
    {
        id: '2',
        name: "Gỏi Bưởi Tôm Khô",
        description: "Gỏi bưởi với tôm khô và rau răm",
        price: 100000,
        image: "https://cdn.tgdd.vn/Files/2018/09/24/1120056/cach-lam-goi-buoi-tom-kho-chua-ngot-cuc-ngon-mieng-202203141704331092.jpg",
        category: "Món khai vị"
    },
    {
        id: '3',
        name: "Gỏi Cá Hồi",
        description: "Cá hồi tươi với sốt mayonnaise và rau sống",
        price: 150000,
        image: "https://file.hstatic.net/1000030244/file/huong-dan-cach-lam-goi-ca-hoi-an-kem-rau-song-cuc-ngon-4_d175b6b7332f4695bdd4e57da27e8eb8_grande.jpg",
        category: "Món khai vị"
    },
    {
        id: '4',
        name: "Gỏi Cuốn Tôm Thịt",
        description: "Gỏi cuốn với tôm, thịt heo và rau sống",
        price: 80000,
        image: "https://naucohungthinh.com/files/media/202109/5519_4.jpg",
        category: "Món khai vị"
    },
    {
        id: '5',
        name: "Salad Hải Sản",
        description: "Salad với tôm, mực và sốt mayonnaise",
        price: 120000,
        image: "https://product.hstatic.net/200000317293/product/mix_seafood_img_7971_73b0cb71620a4323af4d8a5e68981448_1024x1024.png",
        category: "Món khai vị"
    },
    {
        id: '6',
        name: "Súp Cua",
        description: "Súp cua với trứng cút và nấm",
        price: 100000,
        image: "https://th.bing.com/th/id/R.24bd211cb81ef9181c85ce042810bc65?rik=9AG5Q4yxZUqRvw&riu=http%3a%2f%2fcookingislikelove.com%2fwp%2fwp-content%2fuploads%2f2016%2f07%2feggdropsoup-768x768.jpg&ehk=zr%2bbLQv2WrO4Usf8y6CTn3BvOIt0f2iyMSsKm8zDrfs%3d&risl=&pid=ImgRaw&r=0",
        category: "Món khai vị"
    },
    {
        id: '7',
        name: "Súp Hải Sản",
        description: "Súp với tôm, mực và các loại hải sản",
        price: 120000,
        image: "https://legiaseafood.com/uploads/product/full_xjske3jp7n3luzy-566-sup-hai-san.jpg",
        category: "Món khai vị"
    },
    {
        id: '8',
        name: "Súp Yến",
        description: "Súp yến với thịt gà và nấm",
        price: 200000,
        image: "https://nunest.vn/wp-content/uploads/2022/04/sup-to-yen-thit-ga.jpg",
        category: "Món khai vị"
    },

    // Món chính
    {
        id: '9',
        name: "Gà Nướng Muối Ớt",
        description: "Gà nướng với muối ớt và lá chanh",
        price: 180000,
        image: "https://vinmec-prod.s3.amazonaws.com/images/20210602_135237_351289_ga-nuong-muoi-ot.max-1800x1800.png",
        category: "Món chính"
    },
    {
        id: '10',
        name: "Vịt Quay Bắc Kinh",
        description: "Vịt quay với bánh kếp và sốt hoisin",
        price: 350000,
        image: "https://th.bing.com/th/id/R.5eec5176d1702b3333e8b6d0d55f3f3a?rik=sB5q4o8R19FZtw&pid=ImgRaw&r=0&sres=1&sresct=1",
        category: "Món chính"
    },
    {
        id: '11',
        name: "Tôm Hùm Hấp Bia",
        description: "Tôm hùm hấp với bia và sả",
        price: 450000,
        image: "https://tse2.mm.bing.net/th/id/OIP.x-Borxiys_DgAY9CnEdqAQHaHa?rs=1&pid=ImgDetMain",
        category: "Món chính"
    },
    {
        id: '12',
        name: "Cá Chẽm Hấp Xì Dầu",
        description: "Cá chẽm hấp với xì dầu và gừng",
        price: 280000,
        image: "https://bing.com/th?id=OSK.7e2c4e13ccaa609493060872e6dcab5b",
        category: "Món chính"
    },
    {
        id: '13',
        name: "Bò Wagyu Nướng",
        description: "Thịt bò Wagyu nướng với sốt nấm",
        price: 500000,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3b/ad/44/photo7jpg.jpg",
        category: "Món chính"
    },
    {
        id: '14',
        name: "Cua Hoàng Đế Rang Muối",
        description: "Cua hoàng đế rang muối ớt",
        price: 400000,
        image: "https://toplist.vn/images/800px/cua-hoang-de-rang-muoi-735230.jpg",
        category: "Món chính"
    },
    {
        id: '15',
        name: "Lẩu Hải Sản",
        description: "Lẩu với các loại hải sản tươi",
        price: 350000,
        image: "https://tse1.mm.bing.net/th/id/OIP.fRk8Thk_xn4NF8ZB2lo4YgHaFa?rs=1&pid=ImgDetMain",
        category: "Món chính"
    },

    // Món xào
    {
        id: '16',
        name: "Mì Xào Hải Sản",
        description: "Mì xào với tôm, mực và các loại hải sản",
        price: 120000,
        image: "https://bing.com/th?id=OSK.01a349ee85a550c7b1cc2e4564445e03",
        category: "Món xào"
    },
    {
        id: '17',
        name: "Rau Xào Tỏi",
        description: "Rau cải xào với tỏi",
        price: 80000,
        image: "https://bing.com/th?id=OSK.f5a0e8ff2504ba3b8f7847291a1f96c8",
        category: "Món xào"
    },

    // Món cơm
    {
        id: '18',
        name: "Cơm Chiên Dương Châu",
        description: "Cơm rang với trứng, tôm và thịt",
        price: 100000,
        image: "https://th.bing.com/th/id/R.c8a421d2f6b15f2cc1747eb318e955d8?rik=FAQhV5LzYHSIAw&riu=http%3a%2f%2f4.bp.blogspot.com%2f_2r6KJ_MMRnM%2fS_dckOMSP9I%2fAAAAAAAAAD8%2f0hyXUGzL2-s%2fs1600%2fIMG_5511-1.JPG&ehk=4wtzHNneay8BDG%2fTGjASHFAkbxYe%2fYEV6H4kKMv4eJ0%3d&risl=&pid=ImgRaw&r=0",
        category: "Món cơm"
    },
    {
        id: '19',
        name: "Cơm Gà Xối Mỡ",
        description: "Cơm gà với nước mắm gừng",
        price: 100000,
        image: "https://bing.com/th?id=OSK.f62f294d1dbe6594057ae9a16b7fe606",
        category: "Món cơm"
    },
    {
        id: '20',
        name: "Cơm Rang Cua",
        description: "Cơm rang với thịt cua",
        price: 150000,
        image: "https://th.bing.com/th/id/OIP.oV4S_HiO9wm896ZJQNgkMgHaEL?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Món cơm"
    },

    // Món tráng miệng
    {
        id: '21',
        name: "Chè Thái",
        description: "Chè Thái với các loại trái cây",
        price: 50000,
        image: "https://th.bing.com/th/id/OIP.0N10MDnCILJj0uhGkJ_E9gHaFa?w=211&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Món tráng miệng"
    },
    {
        id: '22',
        name: "Bánh Flan",
        description: "Bánh flan với caramel",
        price: 40000,
        image: "https://th.bing.com/th/id/OIP.aYdlQX_SFxdZSxBrHxeSdQHaE6?w=235&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Món tráng miệng"
    },
    {
        id: '23',
        name: "Kem Dâu",
        description: "Kem dâu tươi",
        price: 45000,
        image: "https://th.bing.com/th/id/OIP.3OMogq323Iu3pgJmlauymQHaE6?w=264&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "Món tráng miệng"
    },
];

const NullFood = {
    id: '',
    name: "",
    description: "",
    price: 0,
    image: "",
    category: ""
};

export default function StepFood() {
    const { watch, setValue } = useFormContext();
    const [searchKey, setSearchKey] = useState("");
    const [foodDetail, setFoodDetail] = useState(NullFood);
    const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<IFoodBooking[]>(watch("foods") || []);

    useEffect(() => {
        setValue("foods", selectedFoods);
    }, [selectedFoods]);

    const minTablePrice = watch("hall").minTablePrice;
    const tablePrice = selectedFoods.reduce((sum, item) => sum + item.price, 0);
    const totalTables = (watch("tables") || 0) + (watch("reserveTables") || 0);

    const filteredFoods = foods.filter((food) => {
        return food.name.toLowerCase().includes(searchKey.toLowerCase());
    })

    const handleSelectFood = (food: IFood) => {
        setSelectedFoods((prev) => {
            if (prev.some(item => item.foodId === food.id)) return prev;
            return [...prev, {
                ...food,
                foodId: food.id,
                note: ""
            }];
        });
    };

    const handleDeleteFood = (deleteId: string) => {
        const updatedFoods = selectedFoods.filter(f => f.foodId !== deleteId);
        setSelectedFoods(updatedFoods);
    };

    const handleChangeNote = (foodId: string, note: string) => {
        setSelectedFoods((prev) =>
            prev.map(item =>
                item.foodId === foodId ? { ...item, note } : item
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
                    {filteredFoods.map((food) => (
                        <Card
                            key={food.id}
                            onClick={() => { handleSelectFood(food) }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                cursor: "pointer",
                                border:
                                    selectedFoods.some(f => f.foodId === food.id)
                                        ? "3px solid #4880FF"
                                        : "1px solid #ccc",
                                boxShadow: selectedFoods.some(f => f.foodId === food.id) ? 4 : 1,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={food.image}
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
                                        setFoodDetail(food);
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
                                    {food.name}
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
                                        {food.description}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <CircleDollarSign size="18px" />
                                        <Typography color="text.secondary" fontSize={14}>
                                            {food.price.toLocaleString('vi-VN')} VND
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        width: 'auto',
                                        height: '30px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 2,
                                        backgroundColor: defaultBgColorMap[food.category],
                                        color: defaultTextColorMap[food.category],
                                        fontWeight: 'bold',
                                    }}>
                                        {food.category}
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
                gap: '10px',
                padding: '2px'
            }}>
                <SearchBar
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                }}>Món đã chọn</Typography>

                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: '7px',
                    padding: '2px',
                    overflowY: 'auto',
                    pr: 1, // để tránh che mất scroll bar
                }}>
                    {selectedFoods.map((item) => (
                        <Box
                            key={item.foodId}
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
                                    width: 'fit-content',
                                    padding: '4px 6px',
                                    borderRadius: 2,
                                    backgroundColor: defaultBgColorMap[item.category],
                                    color: defaultTextColorMap[item.category],
                                    fontWeight: 'bold',
                                }}>
                                    {item.category}
                                </Box>

                                <TextField
                                    value={item.note}
                                    onChange={(e) => handleChangeNote(item.foodId, e.target.value)}
                                    placeholder="Ghi chú"
                                    multiline
                                    variant="standard"
                                />

                            </Box>

                            <IconButton
                                sx={{ height: 'fit-content' }}
                                onClick={() => { handleDeleteFood(item.foodId) }}
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
                    paddingY: '7px',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Đơn giá bàn tối thiểu:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: 'green',
                        }}>
                            {minTablePrice.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Đơn giá bàn:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: tablePrice >= minTablePrice ? 'green' : 'red',
                        }}>
                            {tablePrice.toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            Tổng tiền bàn:
                        </Typography>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: 'green',
                        }}>
                            {(tablePrice * totalTables).toLocaleString('vi-VN')} VND
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <FoodDetailMenu
                open={isDetailMenuOpen}
                onClose={() => setIsDetailMenuOpen(false)}
                initialData={foodDetail}
            />
        </Box>
    );
}
