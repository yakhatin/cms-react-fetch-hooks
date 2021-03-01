/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, PropsWithChildren } from 'react';
import { produce } from 'immer';
import { AppConfigInterface } from '../types/app-config';
import { CatalogInterface } from '../types/catalog';
import { fetchDataContextStorageDefaultValues } from './default-values';
import { AdditionalStateInterface, FetchDataContextStorageInterface } from './types';

export const FetchDataContextStorage = React.createContext<FetchDataContextStorageInterface>(fetchDataContextStorageDefaultValues);

export const FetchDataContextStorageWrapper = ({ children }: PropsWithChildren<any>): React.ReactElement => {
    const [catalogs, setCatalogs] = useState<CatalogInterface[]>([]);
    const [catalogsLoading, setCatalogsLoading] = useState(false);
    const [catalogsFetched, setCatalogsFetched] = useState(false);
    const [appConfig, setAppConfig] = useState<AppConfigInterface | undefined>();
    const [appConfigLoading, setAppConfigLoading] = useState(false);
    const [appConfigFetched, setAppConfigFetched] = useState(false);

    const [additionalState, setAdditionalState] = useState<AdditionalStateInterface>({});

    const setDataOfAdditionalState = <T,>(key: string, data: T) => {
        const nextState = produce(additionalState, (draft: AdditionalStateInterface<T>) => {
            draft[key].data = data;
        });

        setAdditionalState(nextState);
    };

    const setLoadingOfAdditionalState = <T,>(key: string, value: boolean) => {
        const nextState = produce(additionalState, (draft: AdditionalStateInterface<T>) => {
            draft[key].loading = value;
        });

        setAdditionalState(nextState);
    };

    const createAdditionalState = <T,>(key: string, defaultValue: T) => {
        if (typeof additionalState[key] === 'undefined') {
            const nextState = produce(additionalState, (draft: AdditionalStateInterface<T>) => {
                draft[key] = {
                    data: defaultValue,
                    loading: true,
                    setters: {
                        setData: (v: T) => setDataOfAdditionalState<T>(key, v),
                        setLoading: (v: boolean) => setLoadingOfAdditionalState<T>(key, v),
                    },
                };
            });

            setAdditionalState(nextState);
        }
    };

    const contextValue: FetchDataContextStorageInterface = {
        createAdditionalState,
        state: {
            catalogs: {
                data: catalogs,
                fetched: catalogsFetched,
                loading: catalogsLoading,
                setters: {
                    setData: setCatalogs,
                    setFetched: setCatalogsFetched,
                    setLoading: setCatalogsLoading,
                },
            },
            appConfig: {
                data: appConfig,
                fetched: appConfigFetched,
                loading: appConfigLoading,
                setters: {
                    setData: setAppConfig,
                    setFetched: setAppConfigFetched,
                    setLoading: setAppConfigLoading,
                },
            },
            ...additionalState,
        },
    };

    return (
        <FetchDataContextStorage.Provider value={contextValue}>
            {children}
        </FetchDataContextStorage.Provider>
    );
};
