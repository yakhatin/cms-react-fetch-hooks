export interface CartItemInterface {
    cart_item_id: string;
    brand_title: string;
    product_ed_id: number;
    product_title: string;
    product_price: number | null;
    product_price_prefix: string | null;
    product_price_suffix: string | null;
    characteristics: Record<string, string | number>[];
    product_discount_price?: number | null;
    cart_item_count: number;
}

export interface CartInterface {
    cart_id: string;
    visit_id?: string | null;
    discount_id?: number;
    items: CartItemInterface[];
}

export interface CartItemRequestInterface {
    cart_id?: string;
    product_ed_id: number;
    cart_item_count?: number;
    visitor_id?: string | null;
}

export interface CreatedCartItemInterface {
    product_ed_id: number;
    cart_id: string;
    cart_item_id: string;
    cart_item_modified: string;
    cart_item_date: string;
}
