export interface Service {
    _id?: string; // thêm dấu ? nếu khi thêm mới chưa có _id
    name: string;
    description: string;
    price: number;
    image?: string;
    category: string;
}