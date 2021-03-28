import { useEffect, useState } from 'react';
import { fetchData } from '../rest';
import { UseFetchInterface, UseFetchParams } from '../types/use-fetch';

export const useFetch = <T = any>(params: UseFetchParams<T>): UseFetchInterface<T> => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>(params.defaultValue);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number|null>(null);

    const getData = async () => {
        setLoading(true);

        const result = await fetchData<T>(params.rest.name, params.rest.method, params.rest.body);

        if (result.success && result.data) {
            setData(result.data);

            if (typeof result.totalCount === 'number') {
                setTotalCount(result.totalCount);
            }
        } else if (result.success === false) {
            setErrorMessage(result.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        data,
        error: errorMessage,
        refresh: getData,
        loading,
        totalCount,
    };
};
