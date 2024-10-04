import { notifyPromise, updateNotify } from '../lib/notifications';

import { getApiUrl } from '../constants/functions';

export default async function unsignFromConsultation(consultationId: string) {
    console.log(`Unsigning from consultation with id: ${consultationId}`);

    const notifyId = notifyPromise('Odwoływanie zapisu na konsultacje...');

    const fetchData = await fetch(getApiUrl('consultations', 'unsign'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            consultationId,
        }),
    });

    const response = await fetchData.json();

    if (response.error) {
        updateNotify(notifyId, 'Wystąpił błąd. Spróbuj ponownie.', false, {
            type: 'error',
        });
        return false;
    }

    updateNotify(notifyId, 'Pomyślnie wypisałeś się z konsultacji.', false, {
        type: 'success',
    });

    return true;
}
