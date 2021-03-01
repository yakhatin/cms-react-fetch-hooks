interface FetchDataResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
    totalCount?: number | null;
}
export declare type ReceivedMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
declare type ReceivedDataType = string | number | Record<string, any> | FormData;
/**
 * REST запрос
 * @param restName - наименование route из api
 * @param method - тип запроса (GET, POST, PUT, DELETE)
 * @param data - данные для rest запроса
 * @param dataType - тип тела запроса (JSON, FormData)
 */
export declare const fetchData: <T = any>(restName: string, method: ReceivedMethodType, data?: ReceivedDataType | undefined, dataType?: 'JSON' | 'FormData') => Promise<FetchDataResponse<T>>;
export {};
