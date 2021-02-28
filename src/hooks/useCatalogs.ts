import { CatalogInterface } from '../types/catalog';
import useFetch from './useFetch';
import { useFetchContext } from './useFetchContext';

export const useCatalogs = (body?: any) => useFetch<CatalogInterface[]>({
    defaultValue: [],
    rest: {
        name: 'catalogs/list',
        method: 'POST',
        body
    }
});

export const useCatalogsWithContext = (body?: any) => useFetchContext<CatalogInterface[]>({
    defaultValue: [],
    rest: {
        name: 'catalogs/list',
        method: 'POST',
        body
    },
    key: 'catalogs'
});