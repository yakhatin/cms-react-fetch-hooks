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

export const useCatalogsWithContext = (body?: ReceivedDataType) => useFetchContext<CatalogInterface[]>({
    defaultValue: [],
    rest: {
        name: 'catalogs/list',
        method: 'POST',
        body,
    },
    key: 'catalogs',
});
