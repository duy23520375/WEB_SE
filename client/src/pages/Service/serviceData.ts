export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export const serviceList: Service[] = [
    {
        id: 1,
        name: "Trang Trí Sảnh Tiệc",
        description: "Trang trí sảnh tiệc với hoa tươi, bóng bay, backdrop và các phụ kiện trang trí",
        price: 15000000,
        image: "https://nhahanghuonglieusunflower.com/wp-content/uploads/2023/06/Trang-tri-sanh-tiec-cuoi-1.jpg",
        category: "Trang Trí"
    },
    {
        id: 2,
        name: "Trang Trí Bàn Tiệc",
        description: "Trang trí bàn tiệc với khăn trải bàn, hoa tươi, nến và các phụ kiện",
        price: 500000,
        image: "https://cdn.tgdd.vn/2021/12/CookDishThumb/cach-trang-tri-ban-tiec-ngot-doc-dao-moi-la-ap-dung-duoc-cho-thumb-620x620.jpg",
        category: "Trang Trí"
    },
    {
        id: 3,
        name: "Trang Trí Lễ Đường",
        description: "Trang trí lễ đường với hoa tươi, backdrop và các phụ kiện trang trí",
        price: 10000000,
        image: "https://tse1.mm.bing.net/th/id/OIP.-puz0hvMSoSpr8ow03r1RwEyDM?rs=1&pid=ImgDetMain",
        category: "Trang Trí"
    },
    {
        id: 4,
        name: "MC Chuyên Nghiệp",
        description: "MC dẫn chương trình đám cưới chuyên nghiệp, có kinh nghiệm",
        price: 5000000,
        image: "https://webdamcuoi.com/wp-content/uploads/2022/01/mc-dam-cuoi-1024x570.jpg",
        category: "MC & Ca Sĩ"
    },
    {
        id: 5,
        name: "Ca Sĩ Hát Live",
        description: "Ca sĩ hát live tại đám cưới với nhạc cụ",
        price: 8000000,
        image: "https://tse2.mm.bing.net/th/id/OIP.RJBQRtjbja59537YUUsmegHaE7?rs=1&pid=ImgDetMain",
        category: "MC & Ca Sĩ"
    },
    {
        id: 6,
        name: "Ban Nhạc Sống",
        description: "Ban nhạc sống biểu diễn tại đám cưới",
        price: 12000000,
        image: "https://tse3.mm.bing.net/th/id/OIP.kM2F15lLcH9e4RdqCzMDnwHaE7?rs=1&pid=ImgDetMain",
        category: "MC & Ca Sĩ"
    },
    {
        id: 7,
        name: "Quay Phim Chuyên Nghiệp",
        description: "Quay phim đám cưới với máy quay chuyên nghiệp",
        price: 15000000,
        image: "https://tse4.mm.bing.net/th/id/OIP.gx2kWyON409-DaK5YOpORAHaEi?rs=1&pid=ImgDetMain",
        category: "Quay Chụp"
    },
    {
        id: 8,
        name: "Chụp Ảnh Cưới",
        description: "Chụp ảnh cưới với nhiếp ảnh gia chuyên nghiệp",
        price: 10000000,
        image: "https://toplist.vn/images/800px/ah-studio-692689.jpg",
        category: "Quay Chụp"
    },
    {
        id: 9,
        name: "Trang Điểm Cô Dâu",
        description: "Trang điểm cô dâu với chuyên gia trang điểm",
        price: 5000000,
        image: "https://th.bing.com/th/id/R.1b26497fc5b8d280cef2e540e1f58639?rik=NcCaAEts4QRg0Q&pid=ImgRaw&r=0",
        category: "Làm Đẹp"
    },
    {
        id: 10,
        name: "Làm Tóc Cô Dâu",
        description: "Làm tóc cô dâu với chuyên gia tạo mẫu tóc",
        price: 3000000,
        image: "https://erocante.vn/wp-content/uploads/2021/01/kieu-toc-cho-co-dau-mat-dai.jpg",
        category: "Làm Đẹp"
    },
    {
        id: 11,
        name: "Áo Dài Cưới",
        description: "Cho thuê áo dài cưới truyền thống",
        price: 2000000,
        image: "https://th.bing.com/th/id/R.e1c951e3746adb79924709cf649c2f39?rik=xKA8HSRnShOAZg&pid=ImgRaw&r=0",
        category: "Trang Phục"
    },
    {
        id: 12,
        name: "Vest Cưới",
        description: "Cho thuê vest cưới cho chú rể",
        price: 1500000,
        image: "https://th.bing.com/th/id/R.d5124a32bd990d59da2ad88db0d581dc?rik=0R8AcCkW8Ypwww&pid=ImgRaw&r=0",
        category: "Trang Phục"
    },
    {
        id: 13,
        name: "Xe Hoa",
        description: "Cho thuê xe hoa trang trí đẹp mắt",
        price: 5000000,
        image: "https://tse3.mm.bing.net/th/id/OIP.YwPx-ViAOArJbQ6sXgoIBwHaEo?rs=1&pid=ImgDetMain",
        category: "Phương Tiện"
    },
    {
        id: 14,
        name: "Xe Đưa Đón Khách",
        description: "Dịch vụ xe đưa đón khách mời",
        price: 3000000,
        image: "https://th.bing.com/th/id/R.e6abef4f975a33a350b55c4b81176466?rik=wPENk0iummvS7A&pid=ImgRaw&r=0",
        category: "Phương Tiện"
    },
    {
        id: 15,
        name: "Thiệp Cưới",
        description: "Thiết kế và in thiệp cưới",
        price: 100000,
        image: "https://kalina.com.vn/wp-content/uploads/2022/04/nhung-mau-thiep-cuoi-dep-khong-the-bo-qua-trong-ngay-cuoi-25.jpg",
        category: "Thiệp & Quà"
    },
    {
        id: 16,
        name: "Hộp Quà Cưới",
        description: "Thiết kế và làm hộp quà cưới",
        price: 50000,
        image: "https://tse3.mm.bing.net/th/id/OIP.4-Lx4G02W-_dZbPUFQcxqgHaHa?rs=1&pid=ImgDetMain",
        category: "Thiệp & Quà"
    },
    {
        id: 17,
        name: "Bánh Cưới",
        description: "Đặt bánh cưới nhiều tầng",
        price: 3000000,
        image: "https://product.hstatic.net/200000449489/product/i19__16__a49594884474402cae57254df15b50ee_master.jpg",
        category: "Bánh & Rượu"
    },
    {
        id: 18,
        name: "Rượu Vang",
        description: "Cung cấp rượu vang cho tiệc cưới",
        price: 2000000,
        image: "https://vuanhabep.com.vn/wp-content/uploads/2022/07/ly-ruou-cuoi-1.jpg",
        category: "Bánh & Rượu"
    },
    {
        id: 19,
        name: "Bảo Vệ",
        description: "Dịch vụ bảo vệ cho đám cưới",
        price: 2000000,
        image: "https://th.bing.com/th/id/OIP.SE6YLJpAN5o_asn62rKwxwHaE8?w=290&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "An Ninh"
    },
    {
        id: 20,
        name: "Y Tế",
        description: "Dịch vụ y tế tại đám cưới",
        price: 1500000,
        image: "https://th.bing.com/th/id/OIP.1XRMBkS2H0HoS5lK_o0Q2gHaEK?w=295&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        category: "An Ninh"
    }
]; 