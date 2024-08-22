export interface Products {
    products: ProductDetail[];
}

export interface ProductDetail {
    id: number;
    title: string;
    description: string;
    price: number;
}