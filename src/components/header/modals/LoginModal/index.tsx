import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import $ from 'jquery';

import './style.scss';
import LoadingOverlay from '../../../LoadingOverlay/LoadingOverlay';
import { notify } from '../../../../lib/notifications';

import useVerify from '../../../../services/useVerify';
import useAuth from '../../../../services/useAuth';

import ResetPasswordModal from '../ResetPasswordModal';
import VerifyAccountModal from '../VerifyAccountModal';
import CreateAccountModal from '../CreateAccountModal';

import { Form } from 'react-bootstrap';
import useLoginActions from '../../../../hooks/loginActions';

export default function LoginModal({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) {
    const { setShowVerifyModal } = useVerify();
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { login } = useAuth();

    const { onClickLogin } = useLoginActions(email, password, setShow);

    // function onClickSubmit(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //     ev.preventDefault();
    //     if (email === '' || password === '') {
    //         notify('Wypełnij wszystkie pola.', {
    //             type: 'error',
    //         });

    //         return;
    //     }

    //     login(email, password);
    // }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                }}
                backdrop={'static'}
                keyboard={false}
                centered
                id="login-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Logowanie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="login-form">
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
                                    setShow(false);
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
                                    setShow(false);
                                    setShowResetPassword(true);
                                }}
                            >
                                Zapomniałeś hasła?
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <ResetPasswordModal show={showResetPassword} setShow={setShowResetPassword} />
            <VerifyAccountModal />
            <CreateAccountModal />
        </>
    );
}
