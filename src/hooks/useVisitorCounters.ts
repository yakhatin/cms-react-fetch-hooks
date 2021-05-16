import { useEffect } from 'react';
import { useAppConfig } from './useAppConfig';
import { fetchData } from '../rest';
import '../yandex-metrica';
import { InitVisitorRequest, Visitor } from '../types/visitor';

export const visitorIdStorageKey = 'visitor_id';
export const lastVisitDateStorageKey = 'last_visit';

export const useVisitorCounters = () => {
    const { data: config } = useAppConfig();

    const sendVisitorData = async (ymUID: string | null) => {
        const { referrer } = document;
        const data: InitVisitorRequest = {
            referrer: referrer.length > 0 ? referrer : null,
            ym_clientID: ymUID,
            clientUrl: document.URL,
            visitor_id: localStorage.getItem(visitorIdStorageKey),
            last_visit: localStorage.getItem(lastVisitDateStorageKey),
        };

        const result = await fetchData<Visitor>('visitor', 'POST', data);

        if (result.success) {
            if (result.data && typeof result.data === 'object') {
                localStorage.setItem(visitorIdStorageKey, result.data.visitor_id);
                localStorage.setItem(lastVisitDateStorageKey, result.data.last_visit);
            }
        } else {
            console.error(result.message);
        }
    };

    useEffect(() => {
        if (config && typeof config === 'object') {
            if (typeof config.config_id === 'number' && typeof config.ym_counterID === 'string') {
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
        }
    }, [config]);
};
