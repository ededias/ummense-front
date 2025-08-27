export interface Product {
    name: string;
    code: string;
    price: number;
    brand: { id: string; name: string };
    stock: number;
    category: { id: string; name: string };
    image: string;
}