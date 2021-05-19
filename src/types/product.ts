import { ImageInterface } from './image';

export interface ProductCharacteristicInterface {
    title: string;
    value: string;
}

export interface ProductInterface {
    product_ed_id: number;
    catalog_id?: number | null;
    catalog_ed_id?: number | null;
    catalog_title?: string | null;
    catalog_path?: { catalog_id: number; catalog_title: string }[];
    brand_id?: number;
    brand_title?: string;
    product_title: string;
    product_description: string | null;
    product_is_stock: number;
    product_price: number | null;
    product_price_prefix: string | null;
    product_price_suffix: string | null;
    product_discount_price: number | null;
    product_count: number | null;
    characteristics: ProductCharacteristicInterface[];
    images: ImageInterface[];
}
