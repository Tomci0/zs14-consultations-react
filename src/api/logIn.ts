import { getApiUrl } from '../constants/functions';

export default async function LogIn(username: string, password: string) {
    const data = await fetch(getApiUrl('auth', 'login'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    return data.json();
}
