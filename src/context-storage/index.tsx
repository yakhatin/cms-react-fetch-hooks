/* eslint-disable @typescript-eslint/comma-dangle */
import React, { PropsWithChildren, useReducer } from 'react';
import { fetchDataContextStorageDefaultValues } from './default-values';
import { Action, stateReducer } from './reducer';
import { ContextStateInterface, FetchDataContextStorageInterface } from './types';

export const FetchDataContext = React.createContext<FetchDataContextStorageInterface>(fetchDataContextStorageDefaultValues);

export const FetchDataContextWrapper = ({ children }: PropsWithChildren<any>): React.ReactElement => {
    const [state, stateDispatch] = useReducer<React.Reducer<ContextStateInterface, Action>>(stateReducer, {});

    const setDataOfAdditionalState = <T,>(key: string, value: T, totalCount?: number | null) => stateDispatch({
        type: 'setData', key, value, totalCount
    });

    const setLoadingOfAdditionalState = (key: string, value: boolean) => stateDispatch({ key, type: 'setLoading', value });

    const createState = <T,>(key: string, defaultValue: T) => {
        if (typeof state[key] === 'undefined') {
            const value = {
                data: defaultValue,
                fetched: false,
                loading: false,
                setters: {
                    setData: (v: T, totalCount?: number | null) => setDataOfAdditionalState<T>(key, v, totalCount),
                    setLoading: (v: boolean) => setLoadingOfAdditionalState(key, v),
                },
                totalCount: null
            };

            stateDispatch({ key, type: 'create', value });
        }
    };

    const contextValue: FetchDataContextStorageInterface = {
        createState,
        state,
    };

    return (
        <FetchDataContext.Provider value={contextValue}>
            {children}
        </FetchDataContext.Provider>
    );
};
