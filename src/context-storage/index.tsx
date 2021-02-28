import React, { useState, PropsWithChildren } from 'react';
import { produce } from 'immer';
import { AppConfigInterface } from '../types/app-config';
import { CatalogInterface } from '../types/catalog';
import { fetchDataContextStorageDefaultValues } from './default-values';
import InitialHooksWrapper from './initial-hooks-wrapper';
import { AdditionalStateInterface, FetchDataContextStorageInterface } from './types';

export const FetchDataContextStorage = React.createContext<FetchDataContextStorageInterface>(fetchDataContextStorageDefaultValues);

const FetchDataContextStorageWrapper = ({ children }: PropsWithChildren<any>): React.ReactElement => {
    const [catalogs, setCatalogs] = useState<CatalogInterface[]>([]);
    const [catalogsLoading, setCatalogsLoading] = useState(true);
    const [appConfig, setAppConfig] = useState<AppConfigInterface | undefined>();
    const [appConfigLoading, setAppConfigLoading] = useState(true);

    const [additionalState, setAdditionalState] = useState<AdditionalStateInterface>({});

    const setDataOfAdditionalState = <T,>(key: string, data: T) => {
        const nextState = produce(additionalState, (draft: AdditionalStateInterface<T>) => {
            draft[key].data = data;
        });

        setAdditionalState(nextState);
    }

    const setLoadingOfAdditionalState = <T,>(key: string, value: boolean) => {
        const nextState = produce(additionalState, (draft: AdditionalStateInterface<T>) => {
            draft[key].loading = value;
        });

        setAdditionalState(nextState);
    }

    const createAdditionalState = <T,>(key: string, defaultValue: T) => {
        if (typeof additionalState[key] === 'undefined') {
            const nextState = produce(additionalState, (draft: AdditionalStateInterface<T>) => {
                draft[key] = {
                    data: defaultValue,
                    loading: true,
                    setters: {
                        setData: (v: T) => setDataOfAdditionalState<T>(key, v),
                        setLoading: (v: boolean) => setLoadingOfAdditionalState<T>(key, v),
                    }
                }
            });

            setAdditionalState(nextState);
        }
    }

    const contextValue: FetchDataContextStorageInterface = {
        createAdditionalState,
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
        ...additionalState
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
