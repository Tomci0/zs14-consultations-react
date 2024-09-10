import { useState, useRef } from 'react';

import { Card, FloatingLabel, Form } from 'react-bootstrap';

import './style.scss';

import VerifyAccountModal from '../../verify-account';
import ResetPasswordModal from './ResetPasswordModal';
import LogIn from '../../../api/logIn';

import { Id } from 'react-toastify';

import { notify, notifyPromise, updateNotify } from '../../../lib/notifications';

export default function AuthenticationCard({ setIsLogged }: { setIsLogged: (show: boolean) => void }) {
    const [showVerifyAccount, setShowVerifyAccount] = useState<boolean>(false);
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function onClickSubmit(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        ev.preventDefault();
        if (email === '' || password === '') {
            notify('Wypełnij wszystkie pola.', {
                type: 'error',
            });

            return;
        }

        const api = async () => {
            const toastId = notifyPromise('Logowanie...');
            const response = await LogIn(email, password);

            if (response?.error) {
                // notify(response.message, {
                //     type: 'error',
                // });

                updateNotify(toastId, response.message, false, { type: 'error' });
            }

            if (response?.success) {
                // notify('Zalogowano pomyślnie.', {
                //     type: 'success',
                // });
                updateNotify(toastId, 'Zalogowano pomyślnie.', false, { type: 'success' });
                setIsLogged(true);
            }
        };

        api();
    }

    return (
        <>
            <Card id="authentication-dropdown-card">
                <Card.Header>Logowanie</Card.Header>
                <Card.Body>
                    <form id="login-form">
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
                                    autoComplete="password"
                                />
                            </Form.Group>
                        </Form>
                        <div className="buttons">
                            <button className="btn btn-primary mt-3" onClick={onClickSubmit}>
                                Zaloguj
                            </button>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowVerifyAccount(true);
                                }}
                            >
                                Aktywuj Konto
                            </button>
                        </div>
                        <div className="reset-password">
                            <button
                                className="btn btn-link mt-3"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowResetPassword(true);
                                }}
                            >
                                Zapomniałeś hasła?
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>

            <VerifyAccountModal show={showVerifyAccount} setShow={setShowVerifyAccount} userCode="1111" />
            <ResetPasswordModal show={showResetPassword} setShow={setShowResetPassword} />
        </>
    );
}