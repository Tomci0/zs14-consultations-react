import { getApiUrl } from '../constants/functions';

export default async function logout() {
    const data = await fetch(getApiUrl('auth', 'logout'), {
        method: 'POST',
        credentials: 'include',
    });

    return data.json();
}
