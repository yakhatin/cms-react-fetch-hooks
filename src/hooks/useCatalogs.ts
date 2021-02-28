import { CatalogInterface } from '../types/catalog';
import defaultHook from './defaultHook';

export const useCatalogs = (body?: any) => defaultHook<CatalogInterface[]>({
    defaultValue: [],
    rest: {
        name: 'catalogs/list',
        method: 'POST',
        body
    },
    dataKey: 'catalogs'
});