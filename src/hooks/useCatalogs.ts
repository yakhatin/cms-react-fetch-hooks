import { useEffect, useState } from 'react';
import { fetchData } from '../rest';
import { CatalogInterface } from '../types/catalog';

export const useCatalogs = () => {
    const [loading, setLoading] = useState(false);
    const [catalogs, setCatalogs] = useState<CatalogInterface[]>([]);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    const getCatalogs = async () => {
        setLoading(true);

        const result = await fetchData<CatalogInterface[]>('catalogs/list', 'POST');

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
            setCatalogs(result.data);
        } else if (result.success === false) {
            setErrorMessage(result.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        getCatalogs();
    }, []);

    return {
        catalogs,
        error: errorMessage,
        loading
    }
};