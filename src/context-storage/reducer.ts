/* eslint-disable no-param-reassign */
import produce from 'immer';
import { ContextStateEntityInterface, ContextStateInterface } from './types';

export interface Action {
    value: any | boolean | ContextStateEntityInterface<any>;
    key: string;
    type: 'create' | 'setData' | 'setLoading';
    totalCount?: number | null;
}

export const stateReducer = (state: ContextStateInterface, action: Action) => {
    switch (action.type) {
    case 'create':
        return produce(state, (draft: ContextStateInterface) => {
            if (action.value && typeof action.value === 'object') {
                draft[action.key] = action.value;
            }
        });
    case 'setData':
        return produce(state, (draft: ContextStateInterface) => {
            draft[action.key].data = action.value;
            draft[action.key].fetched = true;
            draft[action.key].totalCount = action.totalCount;
        });
    case 'setLoading':
        return produce(state, (draft: ContextStateInterface) => {
            draft[action.key].loading = action.value;
        });
    default: return state;
    }
};
