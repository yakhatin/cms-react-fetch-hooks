export declare const fetchDataContextStorageDefaultValues: {
    createAdditionalState: () => void;
    state: {
        catalogs: {
            data: never[];
            loading: boolean;
            setters: {
                setData: () => void;
                setLoading: () => void;
            };
        };
        appConfig: {
            data: undefined;
            loading: boolean;
            setters: {
                setData: () => void;
                setLoading: () => void;
            };
        };
    };
};
