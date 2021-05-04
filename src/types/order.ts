export interface OrderClientDataRequestInterface {
    order_client_name: string;
    order_client_phone: string;
}
export interface OrderRequestInterface extends OrderClientDataRequestInterface {
    cart_id?: string;
    visit_id?: number;
}
