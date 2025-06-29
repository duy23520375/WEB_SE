// Đã chuyển sang src/pages/Hall/hall.interface.ts

export interface IHall {
    id: string;
    name: string;
    type: string;
    maxTable: number;
    minTablePrice: number;
    description: string;
    image: string;
}

export interface IParty {
    id: number;
    groom: string;
    bride: string;
    phone: string;
    date: string;
    shift: string;
    hall: string;
    type: string;
    deposit: number;
    tables: number;
    reserveTables: number;
    status: string;
}