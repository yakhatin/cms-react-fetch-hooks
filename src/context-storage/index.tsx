/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, PropsWithChildren, useReducer } from 'react';
import { produce } from 'immer';
import { AppConfigInterface } from '../types/app-config';
import { CatalogInterface } from '../types/catalog';
import { fetchDataContextStorageDefaultValues } from './default-values';
import { AdditionalStateInterface, FetchDataContextStorageInterface, StateEntityInterface } from './types';

interface Action {
    value: any | boolean | StateEntityInterface<any>;
    key: string;
    type: 'create' | 'setData' | 'setLoading';
}

const additionalStateReducer = (state: AdditionalStateInterface, action: Action) => {
    switch (action.type) {
    case 'create':
        return produce(state, (draft: AdditionalStateInterface) => {
            if (action.value && typeof action.value === 'object') {
                draft[action.key] = action.value;
            }
        });
    case 'setData':
        return produce(state, (draft: AdditionalStateInterface) => {
            draft[action.key].data = action.value;
            draft[action.key].fetched = true;
        });
    case 'setLoading':
        return produce(state, (draft: AdditionalStateInterface) => {
            draft[action.key].loading = action.value;
        });
    default: return state;
    }
};

export const FetchDataContext = React.createContext<FetchDataContextStorageInterface>(fetchDataContextStorageDefaultValues);

export const FetchDataContextWrapper = ({ children }: PropsWithChildren<any>): React.ReactElement => {
    const [catalogs, setCatalogs] = useState<CatalogInterface[]>([]);
    const [catalogsLoading, setCatalogsLoading] = useState(false);
    const [catalogsFetched, setCatalogsFetched] = useState(false);
    const [appConfig, setAppConfig] = useState<AppConfigInterface | undefined>();
    const [appConfigLoading, setAppConfigLoading] = useState(false);
    const [appConfigFetched, setAppConfigFetched] = useState(false);

    const [additionalState, additionalDispatch] = useReducer<React.Reducer<AdditionalStateInterface, Action>>(additionalStateReducer, {});

    const setDataOfAdditionalState = <T,>(key: string, value: T) => additionalDispatch({ type: 'setData', key, value });

    const setLoadingOfAdditionalState = (key: string, value: boolean) => additionalDispatch({ key, type: 'setLoading', value });

    const setAppConfigData = (v?: AppConfigInterface) => {
        setAppConfigFetched(true);
        setAppConfig(v);
    };

    const setCatalogsData = (v: CatalogInterface[]) => {
        setCatalogsFetched(true);
        setCatalogs(v);
    };

    const createAdditionalState = <T,>(key: string, defaultValue: T) => {
        if (typeof additionalState[key] === 'undefined') {
            const value = {
                data: defaultValue,
                fetched: false,
                loading: false,
                setters: {
                    setData: (v: T) => setDataOfAdditionalState<T>(key, v),
                    setLoading: (v: boolean) => setLoadingOfAdditionalState(key, v),
                },
            };

            additionalDispatch({ key, type: 'create', value });
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
                    setData: setCatalogsData,
                    setLoading: setCatalogsLoading,
                },
            },
            appConfig: {
                data: appConfig,
                fetched: appConfigFetched,
                loading: appConfigLoading,
                setters: {
                    setData: setAppConfigData,
                    setLoading: setAppConfigLoading,
                },
            },
            ...additionalState,
        },
    };

    return (
        <FetchDataContext.Provider value={contextValue}>
            {children}
        </FetchDataContext.Provider>
    );
};
