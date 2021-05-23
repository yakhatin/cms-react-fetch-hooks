import { useEffect } from 'react';
import { useAppConfig } from './useAppConfig';
import { fetchData } from '../rest';
import '../yandex-metrica';
import { InitVisitorRequest, Visitor } from '../types/visitor';

declare let ym: Function;

export const visitorIdStorageKey = 'visitor_id';
export const lastVisitDateStorageKey = 'last_visit';

export const useYandexMetrika = () => {
    const { data: appConfig } = useAppConfig();

    const metrika = (...args: any[]) => {
        if (ym && typeof ym === 'function' && (typeof appConfig?.ym_counterID === 'number' || typeof appConfig?.ym_counterID === 'string')) {
            const ymId = typeof appConfig.ym_counterID === 'string' ? parseInt(appConfig.ym_counterID, 10) : appConfig.ym_counterID;
            ym(ymId, ...args);
        }
    };

    return {
        metrika,
    };
};

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

                ym(ymID, 'init', {
                    defer: true,
                    triggerEvent: true,
                    clickmap: true,
                    webvisor: true,
                    trackLinks: true,
                    trackHash: true,
                });

                document.addEventListener(`yacounter${ymID}inited`, () => {
                    ym(ymID, 'getClientID', sendVisitorData);
                });
            } else {
                sendVisitorData(null);
            }
        }
    }, [config?.config_id]);
};
