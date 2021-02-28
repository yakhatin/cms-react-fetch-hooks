import React, { useState, PropsWithChildren } from 'react';
import { AppConfigInterface } from '../types/app-config';
import { CatalogInterface } from '../types/catalog';
import { fetchDataContextStorageDefaultValues } from './default-values';
import InitialHooksWrapper from './initial-hooks-wrapper';
import { FetchDataContextStorageInterface } from './types';

export const FetchDataContextStorage = React.createContext<FetchDataContextStorageInterface>(fetchDataContextStorageDefaultValues);

const FetchDataContextStorageWrapper = ({ children }: PropsWithChildren<any>): React.ReactElement => {
    const [catalogs, setCatalogs] = useState<CatalogInterface[]>([]);
    const [catalogsLoading, setCatalogsLoading] = useState(true);
    const [appConfig, setAppConfig] = useState<AppConfigInterface | undefined>();
    const [appConfigLoading, setAppConfigLoading] = useState(true);

    const contextValue: FetchDataContextStorageInterface = {
        catalogs: {
            data: catalogs,
            loading: catalogsLoading,
            setters: {
                setData: setCatalogs,
                setLoading: setCatalogsLoading,
            },
        },
        appConfig: {
            data: appConfig,
            loading: appConfigLoading,
            setters: {
                setData: setAppConfig,
                setLoading: setAppConfigLoading,
            },
        },
    };

    return (
        <FetchDataContextStorage.Provider value={contextValue}>
            <InitialHooksWrapper>
                {children}
            </InitialHooksWrapper>
        </FetchDataContextStorage.Provider>
    );
};

export default FetchDataContextStorageWrapper;
