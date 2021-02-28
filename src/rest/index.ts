interface FetchDataResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
    totalCount?: number | null;
}

export type ReceivedMethodType = 'GET' | 'POST' | 'PUT'| 'DELETE';
type ReceivedDataType = string | number | Record<string, any> | FormData;

/**
 * REST запрос
 * @param restName - наименование route из api
 * @param method - тип запроса (GET, POST, PUT, DELETE)
 * @param data - данные для rest запроса
 * @param dataType - тип тела запроса (JSON, FormData)
 */
export const fetchData = async <T = any>(restName: string, method: ReceivedMethodType, data?: ReceivedDataType, dataType: 'JSON' | 'FormData' = 'JSON'): Promise<FetchDataResponse<T>> => {
    let additionalLink = '';
    let body: FormData | string | undefined;
    const headers = new Headers();

    headers.append('accept', 'application/json');

    if (typeof data === 'string' || typeof data === 'number') {
        additionalLink = `${data}`;
    }

    if (typeof data !== 'string' && typeof data === 'object') {
        if (dataType === 'JSON') {
            headers.append('content-type', 'application/json');

            body = JSON.stringify(data);
        }

        if (dataType === 'FormData') {
            body = data as FormData;
        }
    }

    try {
        const response = await fetch(`${apiAdress}${restName}${additionalLink}`, {
            method,
            body,
            headers,
            credentials: 'same-origin',
        });

        if (response.ok === false) {
            if (response.status === 401) {
                throw new Error('Ошибка авторизации пользователя.');
            } else {
                throw new Error(`${response.url} (${response.status})`);
            }
        }

        try {
            const json = await response.json();

            return json;
        } catch (err) {
            throw new Error(err);
        }
    } catch (err) {
        console.log(err);

        return {
            success: false,
            message: err,
            data: null,
        };
    }
};
