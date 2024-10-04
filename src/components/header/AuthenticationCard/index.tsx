import { useState, useRef } from 'react';

import { Card, FloatingLabel, Form } from 'react-bootstrap';

import './style.scss';

import VerifyAccountModal from '../modals/VerifyAccountModal';
import ResetPasswordModal from '../modals/ResetPasswordModal';
import CreateAccountModal from '../modals/CreateAccountModal';
import LogIn from '../../../api/logIn';

import useAuth from '../../../services/useAuth';

import { notify, notifyPromise, updateNotify } from '../../../lib/notifications';
import IUser from '../../../types/user.type';
import useVerify from '../../../services/useVerify';

import useLoginActions from '../../../hooks/loginActions';

export default function AuthenticationCard() {
    const { setShowVerifyModal } = useVerify();
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { onClickLogin } = useLoginActions(email, password);

    return (
        <>
            <Card id="authentication-dropdown-card">
                <Card.Header>Logowanie</Card.Header>
                <Card.Body>
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
                        <button className="btn btn-primary mt-3" onClick={onClickLogin}>
                            Zaloguj
                        </button>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowVerifyModal(true);
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
                </Card.Body>
            </Card>
            <ResetPasswordModal show={showResetPassword} setShow={setShowResetPassword} />
            <VerifyAccountModal />
            <CreateAccountModal />
        </>
    );
}
