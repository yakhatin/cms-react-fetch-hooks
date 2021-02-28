import { AppConfigInterface, CatalogInterface, ImageInterface } from "../types";

export interface AdditionalStateInterface<T = any> {
    [key: string]: {
        data: T;
        loading: boolean;
        setters: {
            setData: (v: T) => void;
            setLoading: (v: boolean) => void;
        };
    };
}

export interface FetchDataContextStorageInterface {
    createAdditionalState: <T>(key: string, defaultValue: T) => void;
    state: {
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
        [key: string]: {
            data: any;
            loading: boolean;
            setters: {
                setData: (v: any) => void;
                setLoading: (v: boolean) => void;
            };
        };
    };
}
