import { useState } from 'react';
import { fetchData } from '../rest';
import { OrderClientDataRequestInterface, OrderDataInterface, OrderRequestInterface } from '../types/order';
import { cartIdStorageKey } from './useCart';
import { visitorIdStorageKey } from './useVisitorCounters';

export const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [data, setData] = useState<OrderDataInterface | undefined>(undefined);

    const makeOrder = async (x: OrderClientDataRequestInterface) => {
        setLoading(true);

        const body: OrderRequestInterface = {
            ...x,
            cart_id: localStorage.getItem(cartIdStorageKey),
            visitor_id: localStorage.getItem(visitorIdStorageKey),
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
