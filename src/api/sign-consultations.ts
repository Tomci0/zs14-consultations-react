import { getApiUrl } from '../constants/functions';
import { notify, notifyPromise, updateNotify } from '../lib/notifications';

export default async function signToConsultations(consultationId: string, reason: string, scope: string | number) {
    // console.log('Signing to consultation with id:', consultationId);
    // console.log('Reason:', reason);
    // console.log('Scope:', scope);

    // const notifyId = notifyPromise('Zapisywanie na konsultacje...');

    // await wait(2000);

    // // 1 or 2

    // const random = Math.random() > 0.5;

    // if (random) {
    //     updateNotify(notifyId, 'Zapisano na konsultacje', false, {
    //         type: 'success',
    //     });
    //     return true;
    // } else {
    //     updateNotify(notifyId, 'Nie udało się zapisać na konsultacje', false, {
    //         type: 'error',
    //     });
    //     return false;
    // }

    const notifyId = notifyPromise('Zapisywanie na konsultacje...');

    const fetchData = await fetch(getApiUrl('consultations', 'sign'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            consultationId,
            reason,
            scope,
        }),
    });

    const response = await fetchData.json();

    if (response.error) {
        updateNotify(notifyId, 'Wystąpił błąd. Spróbuj ponownie.', false, {
            type: 'error',
        });
        return false;
    }

    if (response.success) {
        updateNotify(notifyId, 'Pomyślnie zapisałeś się na konsultacje.', false, {
            type: 'success',
        });
        return true;
    }
}

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
