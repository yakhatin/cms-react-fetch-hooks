import { AppConfigInterface, CatalogInterface, ImageInterface } from '../types';

export interface FetchDataContextStorageInterface {
    catalogs: {
        data: CatalogInterface[];
        loading: boolean;
        setters: {
            setData: (v: CatalogInterface[]) => void;
            setLoading: (v: boolean) => void;
        };
    };
    appConfig: {
        data: AppConfigInterface | undefined;
        loading: boolean;
        setters: {
            setData: (v: AppConfigInterface) => void;
            setLoading: (v: boolean) => void;
        };
    };
}
