import { AppConfigInterface } from '../types/app-config';
import useFetch from './useFetch';
import { useFetchContext } from './useFetchContext';

export const useAppConfig = () => useFetch<AppConfigInterface | undefined>({
    defaultValue: undefined,
    rest: {
        name: 'config',
        method: 'GET',
    },
});

export const useAppConfigWithContext = () => useFetchContext<AppConfigInterface | undefined>({
    defaultValue: undefined,
    rest: {
        name: 'config',
        method: 'GET',
    },
    key: 'appConfig',
});
