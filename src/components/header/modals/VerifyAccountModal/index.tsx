import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';

import { PinInput } from 'react-input-pin-code';

import './style.scss';
import LoadingOverlay from '../../../LoadingOverlay/LoadingOverlay';
import { notify, notifyPromise, updateNotify } from '../../../../lib/notifications';
import { getApiUrl } from '../../../../constants/functions';

import useVerify from '../../../../services/useVerify';

export default function VerifyAccountModal() {
    const { code, setCode, setShowVerifyModal, setShowCreateModal, showVerifyModal, setUserData } = useVerify();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!showVerifyModal) {
            return;
        }
        setCode(['', '', '', '', '', '']);
    }, [showVerifyModal]);

    function onPinChange(value: any, index: number, values: string[]) {
        setCode(values);

        let isFinished = true;

        values.forEach((value) => {
            if (value === '') {
                isFinished = false;
            }
        });

        if (!isFinished) {
            return;
        }

        const api = async () => {
            const notifyId = notifyPromise('Weryfikowanie wprowadzonego kodu...');
            const response = await fetch(getApiUrl('auth', 'verifyCode', values.join('')));
            setLoading(true);

            const data = await response.json();

            if (data.error) {
                updateNotify(notifyId, data.message, false, {
                    type: 'error',
                });
                setLoading(false);
            } else {
                updateNotify(notifyId, 'Kod jest poprawny. Wprowadz dane logowania.', false, {
                    type: 'success',
                });

                setUserData(data.data.user);
                setShowVerifyModal(false);
                setLoading(false);
                setShowCreateModal(true);
            }
        };

        api();
    }

    return (
        <Modal
            show={showVerifyModal}
            onHide={() => {
                setShowVerifyModal(false);
            }}
            backdrop={'static'}
            keyboard={false}
            centered
            id="verify-account-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Wpisz 6-cio cyfrowy kod do aktywacji konta:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="pin-input">
                    <LoadingOverlay isLoading={loading}>
                        <PinInput
                            containerClassName={'pin-input__container blur'}
                            inputClassName={'pin-input__container__input'}
                            onChange={onPinChange}
                            values={code as string[]}
                            showState={false}
                            placeholder={''}
                            id="pin-input"
                        />
                    </LoadingOverlay>
                </div>

                <div className="description"></div>

                <div className="text-center">
                    <span className="text-muted">Aby kontynuować, wpisz kod.</span>
                </div>
            </Modal.Body>
        </Modal>
    );
}
