export interface ContextStateEntityInterface<T> {
    data: T;
    fetched: boolean;
    loading: boolean;
    setters: {
        setData: (v: T, totalCount?: number | null) => void;
        setLoading: (v: boolean) => void;
    };
    totalCount?: number | null;
}

export interface ContextStateInterface<T = any> {
    [key: string]: ContextStateEntityInterface<T>;
}

export interface FetchDataContextStorageInterface {
    createState: <T>(key: string, defaultValue: T) => void;
    state: ContextStateInterface<any>;
}
