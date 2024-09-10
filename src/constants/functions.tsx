import { useMediaQuery } from 'react-responsive';

import config from './config';

export const getApiUrl = (...paths: string[]): string => {
    const fullPath = paths.join('/');
    return `${config.API_URL}/api/${config.API_VERSION}/${fullPath}`;
};

// RESPONSIVE ELEMENTS

export const Mobile = ({ children }: { children: React.ReactNode }) => {
    const isXXL = useMediaQuery({ maxWidth: 991 });
    return <>{isXXL ? children : null}</>;
};

export const Desktop = ({ children }: { children: React.ReactNode }) => {
    const isXL = useMediaQuery({ minWidth: 992 });
    return <>{isXL ? children : null}</>;
};
