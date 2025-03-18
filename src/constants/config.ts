import Config from '../config.json';

export interface IConfig {
    API_URL: string;
    API_VERSION: string;

    ADMIN_PANEL_URL: string;
}

export default {
    API_URL: Config.API_URL as string | 'http://localhost:8000',
    API_VERSION: Config.API_VERSION as string | 'v1',
    ADMIN_PANEL_URL: Config.ADMIN_PANEL_URL as string | 'http://localhost:3001',
} as IConfig;
