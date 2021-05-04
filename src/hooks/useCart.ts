import { useEffect, useState } from 'react';
import { fetchData } from '../rest';
import { CartInterface } from '../types/cart';

export const useCart = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [cartData, setCartData] = useState<CartInterface>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getCartData = async (x: string) => {
        if (typeof x === 'string') {
            setLoading(true);

            const result = await fetchData<CartInterface>(`cart/${x}`, 'GET');

            if (result.success && result.data) {
                setCartData(result.data);
            } else if (result.success === false) {
                setErrorMessage(result.message);
            }

            setLoading(false);
        } else {
            setErrorMessage('Неверный идентификатор корзины');
        }
    };

    useEffect(() => {
        getCartData(id);
    }, [id]);

    return {
        data: cartData,
        error: errorMessage,
        refresh: getCartData,
        loading,
    };
};
