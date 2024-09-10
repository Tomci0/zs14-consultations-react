import { useState } from 'react';

import { Icon } from '@iconify/react';
import { getTheme, initTheme, toggleTheme } from '../../lib/color-modes';

export { initTheme, toggleTheme, getTheme } from '../../lib/color-modes';

export default function ThemeChanger() {
    const [theme, setTheme] = useState<string>(getTheme());
    initTheme();
    return (
        <button
            id="theme-toggle"
            type="button"
            className="btn btn-sm me-3"
            onClick={() => {
                toggleTheme();
                setTheme(getTheme());
            }}
        >
            <Icon id="theme-icon" icon={theme == 'light' ? 'mdi:white-balance-sunny' : 'mdi:weather-night'} />
        </button>
    );
}
