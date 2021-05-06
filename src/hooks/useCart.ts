import { useEffect, useState } from 'react';
import { fetchData } from '../rest';
import { CartInterface } from '../types/cart';

export const cartIdStorageKey = 'cart_id';

export const useCart = () => {
    const [loading, setLoading] = useState(false);
    const [cartData, setCartData] = useState<CartInterface|undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getCartData = async (x?: string) => {
        const cartId = x || localStorage.getItem(cartIdStorageKey);

        if (typeof cartId === 'string') {
            setLoading(true);

            const result = await fetchData<CartInterface[]>(`cart/${cartId}`, 'GET');

            if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                const [data] = result.data;
                setCartData(data);
            } else if (result.success === false) {
                setErrorMessage(result.message);
                setCartData(undefined);
            }

            setLoading(false);
        } else {
            setCartData(undefined);
        }
    };

    useEffect(() => {
        getCartData();
    }, []);

    return {
        data: cartData,
        error: errorMessage,
        refresh: getCartData,
        loading,
    };
};
