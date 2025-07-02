export interface Food {
    _id: string; // Thêm dòng này
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}