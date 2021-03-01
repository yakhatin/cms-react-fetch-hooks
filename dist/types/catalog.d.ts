import { ProductInterface } from "./product";
export interface CatalogExtraDataInterface {
    catalog_ed_id: number;
    catalog_id: number;
    catalog_title: string;
    catalog_description: string | null;
    childrens: CatalogExtraDataInterface[];
    products: ProductInterface[];
}
export interface CatalogInterface {
    catalog_id: number;
    catalog_title: string;
    catalog_description: string | null;
    childrens: CatalogExtraDataInterface[];
    products: ProductInterface[];
}
