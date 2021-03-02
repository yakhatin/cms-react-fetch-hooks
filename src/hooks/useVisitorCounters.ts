import { useEffect } from 'react';
import { useAppConfig } from './useAppConfig';
import { fetchData } from '../rest';
import '../yandex-metrica';

export const useVisitorCounters = () => {
    const { data: config } = useAppConfig();

    const sendVisitorData = (ymUID: string | null) => {
        const { referrer } = document;
        const data = {
            referrer: referrer.length > 0 ? referrer : null,
            ym_clientID: ymUID,
            clientUrl: document.URL,
        };

        fetchData('visitor', 'POST', data);
    };

    useEffect(() => {
        if (config && typeof config === 'object' && typeof config.config_id === 'number' && typeof config.ym_counterID === 'string') {
            const ymID = config.ym_counterID;

            // @ts-ignore
            ym(ymID, 'init', { triggerEvent: true });

            document.addEventListener(`yacounter${ymID}inited`, () => {
                // @ts-ignore
                ym(ymID, 'getClientID', sendVisitorData);
            });
        } else {
            sendVisitorData(null);
        }
    }, [config]);
};
