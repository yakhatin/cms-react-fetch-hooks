import { AppConfigInterface } from '../types/app-config';
import { CatalogInterface } from '../types/catalog';

interface StateEntityInterface<T> {
    data: T;
    fetched: boolean;
    loading: boolean;
    setters: {
        setData: (v: T) => void;
        setFetched: (v: boolean) => void;
        setLoading: (v: boolean) => void;
    };
}

export interface AdditionalStateInterface<T = any> {
    [key: string]: StateEntityInterface<T>;
}

export interface FetchDataContextStorageInterface {
    createAdditionalState: <T>(key: string, defaultValue: T) => void;
    state: {
        catalogs: StateEntityInterface<CatalogInterface[]>;
        appConfig: StateEntityInterface<AppConfigInterface | undefined>;
        [key: string]: StateEntityInterface<any>;
    };
}
