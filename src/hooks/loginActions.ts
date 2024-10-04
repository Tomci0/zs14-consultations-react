import useAuth from '../services/useAuth';

import { notify, notifyPromise, updateNotify } from '../lib/notifications';

export default function useLoginActions(email: string, password: string, setShowLoginModal?: (show: boolean) => void) {
    const { login } = useAuth();

    return {
        onClickLogin: async (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            ev.preventDefault();
            if (email === '' || password === '') {
                notify('Wypełnij wszystkie pola.', {
                    type: 'error',
                });

                return;
            }

            const response = await login(email, password);

            if (!response.error) {
                if (setShowLoginModal) setShowLoginModal(false);
            }
        },
    };
}
