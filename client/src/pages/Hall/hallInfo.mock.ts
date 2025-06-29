export interface IHallInfo {
    image: string;
    description: string;
    location: string;
    maxTables: number;
    minPrice: number;
}

import hallA1Image from "../../assets/ảnh 1.webp";
import hallA2Image from "../../assets/ảnh 2.webp";
import hallA3Image from "../../assets/ảnh 3.jpg";
import hallB1Image from "../../assets/ảnh 4.jpg";
import hallB2Image from "../../assets/ảnh 5.jpg";
import hallB3Image from "../../assets/ảnh 6.png";
import hallC1Image from "../../assets/ảnh 7.jpg";
import hallC2Image from "../../assets/ảnh 8.jpg";
import hallC3Image from "../../assets/ảnh 9.jpg";
import hallD1Image from "../../assets/ảnh 10.jpg";
import hallD2Image from "../../assets/ảnh 11.jpg";
import hallD3Image from "../../assets/ảnh 12.jpg";
import hallE1Image from "../../assets/ảnh 13.jpg";
import hallE2Image from "../../assets/ảnh 14.jpeg";
import hallE3Image from "../../assets/ảnh 15.jpg";

export const hallInfo: Record<string, IHallInfo> = {
    "Grand Ballroom A1": {
        image: hallA1Image,
        description: "Sảnh A1 - Không gian sang trọng, sức chứa lớn, phù hợp cho các buổi tiệc cưới hoành tráng và sự kiện lớn.",
        location: "Tầng 1",
        maxTables: 100,
        minPrice: 1000000,
    },
    "Crystal Hall A2": {
        image: hallA2Image,
        description: "Sảnh A2 - Không gian sang trọng, sức chứa lớn, phù hợp cho các buổi tiệc cưới hoành tráng và sự kiện lớn.",
        location: "Tầng 1",
        maxTables: 100,
        minPrice: 1000000,
    },
    "Diamond Suite A3": {
        image: hallA3Image,
        description: "Sảnh A3 - Không gian sang trọng, sức chứa lớn, phù hợp cho các buổi tiệc cưới hoành tráng và sự kiện lớn.",
        location: "Tầng 1",
        maxTables: 100,
        minPrice: 1000000,
    },
    "Pearl Grand B1": {
        image: hallB1Image,
        description: "Sảnh B1 - Thiết kế hiện đại, ánh sáng tự nhiên, lý tưởng cho các buổi tiệc thân mật và ấm cúng.",
        location: "Tầng 2",
        maxTables: 80,
        minPrice: 1100000,
    },
    "Emerald Ballroom B2": {
        image: hallB2Image,
        description: "Sảnh B2 - Thiết kế hiện đại, ánh sáng tự nhiên, lý tưởng cho các buổi tiệc thân mật và ấm cúng.",
        location: "Tầng 2",
        maxTables: 80,
        minPrice: 1100000,
    },
    "Jade Terrace B3": {
        image: hallB3Image,
        description: "Sảnh B3 - Thiết kế hiện đại, ánh sáng tự nhiên, lý tưởng cho các buổi tiệc thân mật và ấm cúng.",
        location: "Tầng 2",
        maxTables: 80,
        minPrice: 1100000,
    },
    "Rose Garden C1": {
        image: hallC1Image,
        description: "Sảnh C1 - Không gian mở, view đẹp, thích hợp cho tiệc cưới ngoài trời và các buổi tiệc nhẹ nhàng.",
        location: "Tầng 3",
        maxTables: 60,
        minPrice: 1200000,
    },
    "Orchid Grand C2": {
        image: hallC2Image,
        description: "Sảnh C2 - Không gian mở, view đẹp, thích hợp cho tiệc cưới ngoài trời và các buổi tiệc nhẹ nhàng.",
        location: "Tầng 3",
        maxTables: 60,
        minPrice: 1200000,
    },
    "Lily Pavilion C3": {
        image: hallC3Image,
        description: "Sảnh C3 - Không gian mở, view đẹp, thích hợp cho tiệc cưới ngoài trời và các buổi tiệc nhẹ nhàng.",
        location: "Tầng 3",
        maxTables: 60,
        minPrice: 1200000,
    },
    "Eastern Charm D1": {
        image: hallD1Image,
        description: "Sảnh D1 - Phong cách cổ điển, trang trí tinh tế, phù hợp cho các buổi tiệc sang trọng và lịch lãm.",
        location: "Tầng 4",
        maxTables: 50,
        minPrice: 1400000,
    },
    "Western Elegance D2": {
        image: hallD2Image,
        description: "Sảnh D2 - Phong cách cổ điển, trang trí tinh tế, phù hợp cho các buổi tiệc sang trọng và lịch lãm.",
        location: "Tầng 4",
        maxTables: 50,
        minPrice: 1400000,
    },
    "Southern Breeze D3": {
        image: hallD3Image,
        description: "Sảnh D3 - Phong cách cổ điển, trang trí tinh tế, phù hợp cho các buổi tiệc sang trọng và lịch lãm.",
        location: "Tầng 4",
        maxTables: 50,
        minPrice: 1400000,
    },
    "Sunrise Hall E1": {
        image: hallE1Image,
        description: "Sảnh E1 - Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt.",
        location: "Tầng 5",
        maxTables: 40,
        minPrice: 1600000,
    },
    "Moonlight Venue E2": {
        image: hallE2Image,
        description: "Sảnh E2 - Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt.",
        location: "Tầng 5",
        maxTables: 40,
        minPrice: 1600000,
    },
    "Starlight Room E3": {
        image: hallE3Image,
        description: "Sảnh E3 - Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt.",
        location: "Tầng 5",
        maxTables: 40,
        minPrice: 1600000,
    }
}; 