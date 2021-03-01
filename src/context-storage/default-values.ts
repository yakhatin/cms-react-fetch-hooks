import { FetchDataContextStorageInterface } from './types';

const defaultFunction = () => {};

export const fetchDataContextStorageDefaultValues: FetchDataContextStorageInterface = {
    createAdditionalState: () => {},
    state: {
        catalogs: {
            data: [],
            fetched: false,
            loading: false,
            setters: {
                setData: defaultFunction,
                setFetched: defaultFunction,
                setLoading: defaultFunction,
            },
        },
        appConfig: {
            data: undefined,
            fetched: false,
            loading: false,
            setters: {
                setData: defaultFunction,
                setFetched: defaultFunction,
                setLoading: defaultFunction,
            },
        },
    },
};
