import { useContext, useEffect, useState } from "react";
import { FetchDataContextStorage } from "../context-storage";
import { fetchData } from "../rest";
import { UseFetchInterface, UseFetchParamsWithContext } from "../types/use-fetch";

export const useFetchContext = <T = any>(
    params: UseFetchParamsWithContext<T>
): UseFetchInterface<T> => {
    const context = useContext(FetchDataContextStorage);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getData = async () => {
        context.state[params.key].setters.setLoading(true);

        const result = await fetchData<T>(
            params.rest.name,
            params.rest.method,
            params.rest.body
        );

        if (result.success && result.data) {
            context.state[params.key].setters.setData(result.data);
        } else if (result.success === false) {
            setErrorMessage(result.message);
        }

        context.state[params.key].setters.setLoading(false);
    };

    useEffect(() => {
        if (context) {
            if (context.state[params.key] && typeof context.state[params.key] === "object") {
                getData();
            } else {
                context.createAdditionalState(params.key, params.defaultValue);
            }
        }
    }, [params.rest]);

    return {
        data: context && context.state[params.key] ? context.state[params.key].data : params.defaultValue,
        error: errorMessage,
        loading:
            context && context.state[params.key]
                ? context.state[params.key].loading
                : false,
    };
};
