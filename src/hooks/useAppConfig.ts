import { AppConfigInterface } from '../types/app-config';
import { useFetchContext } from './useFetchContext';

export const useAppConfig = () => useFetchContext<AppConfigInterface | undefined>({
    defaultValue: undefined,
    rest: {
        name: 'config',
        method: 'GET',
    },
    key: 'appConfig',
});
