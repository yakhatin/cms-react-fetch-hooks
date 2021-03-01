import { useContext, useEffect, useState } from 'react';
import { FetchDataContextStorage } from '../context-storage';
import { fetchData } from '../rest';
import { UseFetchInterface, UseFetchParamsWithContext } from '../types/use-fetch';

export const useFetchContext = <T = any>(params: UseFetchParamsWithContext<T>): UseFetchInterface<T> => {
    const context = useContext(FetchDataContextStorage);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const stateReady = typeof context.state[params.key] !== 'undefined';

    const getData = async () => {
        context.state[params.key].setters.setLoading(true);

        const result = await fetchData<T>(params.rest.name, params.rest.method, params.rest.body);

        if (result.success && result.data) {
            context.state[params.key].setters.setData(result.data);
            context.state[params.key].setters.setFetched(true);
        } else if (result.success === false) {
            setErrorMessage(result.message);
        }

        context.state[params.key].setters.setLoading(false);
    };

    useEffect(() => {
        if (typeof context.state[params.key] === 'undefined') {
            context.createAdditionalState(params.key, params.defaultValue);
        }
    }, [context]);

    useEffect(() => {
        if (stateReady && context.state[params.key].fetched === false) {
            getData();
        }
    }, [stateReady, params.rest]);

    return {
        data: context && context.state[params.key] ? context.state[params.key].data : params.defaultValue,
        error: errorMessage,
        refresh: getData,
        loading: context && context.state[params.key] ? context.state[params.key].loading : false,
    };
};
