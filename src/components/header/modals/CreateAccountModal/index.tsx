import { useEffect, useState, useRef } from 'react';

import { Modal, Form, Container } from 'react-bootstrap';

import LoadingOverlay from '../../../LoadingOverlay/LoadingOverlay';

import { notifyPromise, updateNotify, notify } from '../../../../lib/notifications';

import './style.scss';
import IUser from '../../../../types/user.type';
import { getApiUrl } from '../../../../constants/functions';

import useVerify from '../../../../services/useVerify';

export default function CreateAccountModal() {
    const { userData, setShowCreateModal, showCreateModal, code } = useVerify();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    function submitForm() {
        if (email === '' || password === '' || retypePassword === '') {
            notify('Wypełnij wszystkie pola.', { type: 'error' });
            return;
        }

        if (password !== retypePassword) {
            notify('Hasła nie są takie same.', { type: 'error' });
            return;
        }

        setLoading(true);

        const api = async () => {
            const notifyId = notifyPromise('Tworzenie konta...');

            const response = await fetch(getApiUrl('users', 'registerUser'), {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    code: code.join(''),
                }),
            });

            const data = await response.json();

            if (data.error) {
                updateNotify(notifyId, data.message, false, {
                    type: 'error',
                });
                setLoading(false);
                return;
            }

            updateNotify(notifyId, 'Ponmyślnie utworzono konto. Teraz zaloguj się.', false, {
                type: 'success',
            });
            setLoading(false);
            setShowCreateModal(false);
        };

        api();
    }

    return (
        <Modal
            show={showCreateModal}
            onHide={() => {
                setShowCreateModal(false);
            }}
            backdrop={'static'}
            keyboard={false}
            centered
            id="create-account-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Witaj, {userData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoadingOverlay isLoading={loading}>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginForm.email">
                            <Form.Label>Adres E-Mail:</Form.Label>
                            <Form.Control
                                onChange={(ev) => setEmail(ev.target.value)}
                                type="email"
                                placeholder=""
                                autoComplete="email"
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginForm.password">
                            <Form.Label>Hasło:</Form.Label>
                            <Form.Control
                                onChange={(ev) => setPassword(ev.target.value)}
                                type="password"
                                placeholder=""
                                autoComplete="new-password"
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginForm.password">
                            <Form.Label>Powtórz Hasło:</Form.Label>
                            <Form.Control
                                onChange={(ev) => setRetypePassword(ev.target.value)}
                                type="password"
                                placeholder=""
                                autoComplete="new-password"
                            />
                        </Form.Group>
                    </Form>

                    <div className="buttons">
                        <button className="btn btn-primary mt-3" onClick={submitForm} disabled={loading}>
                            Zarejestruj
                        </button>
                    </div>
                </LoadingOverlay>
            </Modal.Body>
        </Modal>
    );
}
