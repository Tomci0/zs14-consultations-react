import { notifyPromise, updateNotify } from '../lib/notifications';

export default function unsignFromConsultation(consultationId: number) {
    console.log(`Unsigning from consultation with id: ${consultationId}`);

    const notifyId = notifyPromise('Odwoływanie zapisu na konsultacje...');

    setTimeout(() => {
        const oneortwo = Math.floor(Math.random() * 2) + 1;

        if (oneortwo === 1) {
            updateNotify(notifyId, 'Pomyślnie wypisałeś się z konsultacji.', false, {
                type: 'success',
                progress: undefined,
            });
        } else {
            updateNotify(notifyId, 'Nie udało się wypisać z konsultacji.', false, {
                type: 'error',
                progress: undefined,
            });
        }
    }, 3000);
}
