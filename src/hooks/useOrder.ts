import { useState } from 'react';
import { fetchData } from '../rest';
import { OrderClientDataRequestInterface, OrderDataInterface, OrderRequestInterface } from '../types/order';
import { cartIdStorageKey } from './useCart';

export const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [data, setData] = useState<OrderDataInterface | undefined>(undefined);

    const makeOrder = async (x: OrderClientDataRequestInterface) => {
        setLoading(true);

        const cartId = localStorage.getItem(cartIdStorageKey) || undefined;

        const body: OrderRequestInterface = {
            ...x,
            cart_id: cartId,
        };

        const result = await fetchData<OrderDataInterface>('order', 'POST', body);

        if (result.success) {
            if (result.data) {
                setData(result.data);
            }

            localStorage.removeItem(cartIdStorageKey);
        } else {
            setErrorMessage(result.message);
        }

        setLoading(false);

        return result;
    };

    return {
        data,
        error: errorMessage,
        make: makeOrder,
        loading,
    };
};
