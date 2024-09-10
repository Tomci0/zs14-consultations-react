import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { PinInput } from 'react-input-pin-code';

import $ from 'jquery';

import './style.scss';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { Form } from 'react-router-dom';
import { notify } from '../../lib/notifications';

export default function VerifyAccountModal({
    show,
    setShow,
    userCode,
}: {
    show: boolean;
    setShow: (show: boolean) => void;
    userCode: string;
}) {
    const [loading, setLoading] = useState(false);
    const [pin, setPin] = useState(['', '', '', '', '', '']);

    function onPinChange(value: any, index: number, values: string[]) {
        setPin(values);

        let isFinished = true;

        values.forEach((value) => {
            if (value === '') {
                isFinished = false;
            }
        });

        if (!isFinished) {
            return;
        }

        $('input:focus').trigger('blur');
        setLoading(true);

        setTimeout(() => {
            setShow(false);
            setLoading(false);

            notify('Pomyślnie aktywowałeś swoje konto.', {
                type: 'success',
            });
        }, 2000);
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
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
                            values={pin}
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
