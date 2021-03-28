import { ReceivedDataType, ReceivedMethodType } from './rest';

export interface UseFetchParams<T> {
    defaultValue: T;
    rest: {
        name: string;
        method: ReceivedMethodType;
        body?: ReceivedDataType;
    };
}

export interface UseFetchParamsWithContext<T> extends UseFetchParams<T> {
    key: string;
}

export interface UseFetchInterface<T> {
    data: T;
    error: string | null;
    loading: boolean;
    refresh: () => void;
    totalCount?: number | null;
}
