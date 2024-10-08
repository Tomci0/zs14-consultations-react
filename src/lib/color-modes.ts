/** @enum {string} */
export const THEME = {
    LIGHT: 'light',
    DARK: 'dark',
};

const IS_SERVER = typeof window === 'undefined';

const getDefaultTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME.DARK : THEME.LIGHT);

const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;

    const defaultTheme = getDefaultTheme();
    localStorage.setItem('theme', defaultTheme);

    return defaultTheme;
};

export function getTheme() {
    if (IS_SERVER) return getDefaultTheme();
    return document.body.dataset.bsTheme || getPreferredTheme();
}

export function setTheme(theme: string) {
    if (IS_SERVER) return;
    document.body.dataset.bsTheme = theme;
    localStorage.setItem('theme', theme);
}

export function resetTheme() {
    if (IS_SERVER) return;
    setTheme(getDefaultTheme());
}

export function toggleTheme() {
    if (IS_SERVER) return;
    const nextTheme = document.body.dataset.bsTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setTheme(nextTheme);
}

export function initTheme() {
    if (IS_SERVER) return;
    setTheme(getPreferredTheme());
}
