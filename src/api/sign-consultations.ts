import { notify, notifyPromise, updateNotify } from '../lib/notifications';

export default function signToConsultations(consultationId: number, reason: string, scope: string | number) {
    console.log('Signing to consultation with id:', consultationId);
    console.log('Reason:', reason);
    console.log('Scope:', scope);

    const notifyId = notifyPromise('Zapisywanie na konsultacje...');

    setTimeout(() => {
        const oneortwo = Math.floor(Math.random() * 2) + 1;

        if (oneortwo === 1) {
            updateNotify(notifyId, 'Pomyślnie zapisano na konsultacje.', false, {
                type: 'success',
                progress: undefined,
            });
        } else {
            updateNotify(notifyId, 'Nie udało się zapisać na konsultacje.', false, {
                type: 'error',
                progress: undefined,
            });
        }
    }, 3000);
}
