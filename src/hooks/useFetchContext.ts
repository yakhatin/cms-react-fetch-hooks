import { useContext, useEffect, useState } from 'react';
import { FetchDataContext } from '../context-storage';
import { fetchData } from '../rest';
import { UseFetchInterface, UseFetchParamsWithContext } from '../types/use-fetch';

export const useFetchContext = <T = any>(fetch = false, params: UseFetchParamsWithContext<T>): UseFetchInterface<T> => {
    const context = useContext(FetchDataContext);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const stateReady = typeof context.state[params.key] !== 'undefined';

    const getData = async () => {
        if (stateReady) {
            context.state[params.key].setters.setLoading(true);

            const result = await fetchData<T>(params.rest.name, params.rest.method, params.rest.body);

            if (result.success && result.data) {
                context.state[params.key].setters.setData(result.data, result.totalCount);
            } else if (result.success === false) {
                setErrorMessage(result.message);
            }

            context.state[params.key].setters.setLoading(false);
        }
    };

    useEffect(() => {
        if (stateReady) {
            if (fetch && context.state[params.key].fetched === false) {
                getData();
            }
        } else {
            context.createState(params.key, params.defaultValue);
        }
    }, [stateReady, fetch]);

    return {
        data: context && context.state[params.key] ? context.state[params.key].data : params.defaultValue,
        error: errorMessage,
        refresh: getData,
        loading: context && context.state[params.key] ? context.state[params.key].loading : false,
        totalCount: context && context.state[params.key] ? context.state[params.key].totalCount : null,
    };
};
