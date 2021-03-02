import { CatalogInterface } from '../types/catalog';
import { ReceivedDataType } from '../types/rest';
import { useFetch } from './useFetch';
import { useFetchContext } from './useFetchContext';

export const useCatalogs = (body?: ReceivedDataType) => useFetch<CatalogInterface[]>({
    defaultValue: [],
    rest: {
        name: 'catalogs/list',
        method: 'POST',
        body,
    },
});

export const useCatalogsWithContext = (fetch = false, body?: ReceivedDataType) => useFetchContext<CatalogInterface[]>(fetch, {
    defaultValue: [],
    rest: {
        name: 'catalogs/list',
        method: 'POST',
        body,
    },
    key: 'catalogs',
});
