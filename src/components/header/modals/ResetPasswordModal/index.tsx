import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import $ from 'jquery';

import './style.scss';
import LoadingOverlay from '../../../LoadingOverlay/LoadingOverlay';
import { notify } from '../../../../lib/notifications';

import { Form } from 'react-bootstrap';

export default function ResetPasswordModal({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) {
    const [loading, setLoading] = useState(false);

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
            }}
            backdrop={'static'}
            keyboard={false}
            centered
            id="reset-password-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Zapomniałeś hasła?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Podaj swój adres e-mail:</Form.Label>
                        <LoadingOverlay isLoading={loading} size="sm">
                            <Form.Control type="email" placeholder="" autoComplete="email" />
                        </LoadingOverlay>
                    </Form.Group>
                </Form>
                <div className="buttons">
                    <button
                        className="btn btn-primary mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            setLoading(true);
                            setTimeout(() => {
                                setLoading(false);
                                setShow(false);
                                notify('Na podany adres e-mail został wysłany link do zresetowania hasła.', {
                                    type: 'success',
                                });
                            }, 2000);
                        }}
                    >
                        Wyślij
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
