import { fetchData } from '../rest';
import { CartItemInterface, CartItemRequestInterface } from '../types/cart';

const cartItemRestUrl = 'cart/items/';

const errorIdMessage = 'Неверный идентификатор эл-а корзины';

const useCartItem = () => {
    const addCartItem = async (data: CartItemRequestInterface) => {
        const result = await fetchData(`${cartItemRestUrl}/add`, 'POST', data);
        return result;
    };

    const getCartItemData = async (id: string) => {
        if (typeof id === 'string') {
            const result = await fetchData<CartItemInterface>(`${cartItemRestUrl}${id}`, 'GET');
            return result;
        }

        return {
            success: false,
            message: errorIdMessage,
        };
    };

    const updateCartItemData = async (id: string, data: CartItemRequestInterface) => {
        if (typeof id === 'string') {
            const result = await fetchData<CartItemInterface>(`${cartItemRestUrl}${id}`, 'PUT', data);
            return result;
        }

        return {
            success: false,
            message: errorIdMessage,
        };
    };

    const deleteCartItem = async (id: string) => {
        if (typeof id === 'string') {
            const result = await fetchData<CartItemInterface>(`${cartItemRestUrl}${id}`, 'DELETE');
            return result;
        }

        return {
            success: false,
            message: errorIdMessage,
        };
    };

    return {
        add: addCartItem,
        delete: deleteCartItem,
        get: getCartItemData,
        update: updateCartItemData,
    };
};

export default useCartItem;
