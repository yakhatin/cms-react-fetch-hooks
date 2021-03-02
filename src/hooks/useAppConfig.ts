import { AppConfigInterface } from '../types/app-config';
import { useFetchContext } from './useFetchContext';

export const useAppConfig = (fetch = false) => useFetchContext<AppConfigInterface | undefined>(fetch, {
    defaultValue: undefined,
    rest: {
        name: 'config',
        method: 'GET',
    },
    key: 'appConfig',
});
