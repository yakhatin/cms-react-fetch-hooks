export interface FetchDataResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
    totalCount?: number | null;
}

export interface FetchBodyInterface {
    columns?: string[];
    filters?: {
        column: string;
        values: null | (React.ReactText | null | boolean)[];
        operator?: 'contains' | '=' | '>' | '<' | '<>';
    }[];
    sorter?: {
        column?: string;
        order: 'asc' | 'desc';
    }[];
    page?: number;
    limit?: number;
    [key: string]: any;
}

export type ReceivedMethodType = 'GET' | 'POST' | 'PUT'| 'DELETE';
export type ReceivedDataType = FetchBodyInterface | FormData;
