import { PropsWithChildren } from 'react';
import { useCatalogs } from '../hooks/useCatalogs';

const InitialHooksWrapper = ({ children }: PropsWithChildren<any>) => {
    useCatalogs();

    return children;
};

export default InitialHooksWrapper;