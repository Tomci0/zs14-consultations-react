import { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import IConsultation from '../../../../types/consultation.type';
import './style.scss';

import { Icon } from '@iconify/react';

import Info from './info';
import SigningForm from './signing-form';
import Scopes from './scopes';

import { notify } from '../../../../lib/notifications';
import signToConsultations from '../../../../api/sign-consultations';
import unsignFromConsultation from '../../../../api/unsignFromConsultation';

export default function ConsultationInfoModal({
    show,
    setShow,
    consultationData,
    withSign = true,
    withUnsign = false,
}: {
    show: boolean;
    setShow: (show: boolean) => void;
    consultationData: IConsultation;
    withSign?: boolean;
    withUnsign?: boolean;
}) {
    const [showSign, setShowSign] = useState<boolean>(false);

    // FROM VALUES

    const [currentOption, setCurrentOption] = useState<string>('');
    const [currentScope, setCurrentScope] = useState<string | number>('');

    function submitForm() {
        if (!currentOption) {
            notify('Nie wybrano celu wizyty', {
                type: 'error',
            });
            return;
        }

        if (!currentScope) {
            notify('Nie wpisano celu wizyty', {
                type: 'error',
            });
            return;
        }

        signToConsultations(consultationData.id, currentOption, currentScope);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                }}
                id="consultation-info"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Informajce o konsultacji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Info data={consultationData} />
                        </Col>
                        <Col>
                            <Scopes scopes={consultationData.scopes} description={consultationData.description} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {withSign && (
                        <Button
                            className="btn-modal"
                            variant="none"
                            onClick={() => {
                                setShowSign(true);
                                setShow(false);
                            }}
                        >
                            <Icon icon="mdi:pen" />
                            <span className="btn-text">Zapisz się</span>
                        </Button>
                    )}

                    {withUnsign && (
                        <Button
                            className="btn-modal btn-cancel"
                            variant="none"
                            onClick={() => unsignFromConsultation(consultationData.id)}
                        >
                            <Icon icon="mdi:pen" />
                            <span className="btn-text">Wypisz się</span>
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {withSign && (
                <Modal
                    show={showSign}
                    onHide={() => {
                        setShowSign(false);
                    }}
                    id="consultation-sign-up"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Zapisz się na konsultację</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Info
                                    data={{
                                        id: consultationData.id,
                                        date: consultationData.date,
                                        time: consultationData.time,
                                        subject: consultationData.subject,
                                        teacher: consultationData.teacher,
                                    }}
                                />
                            </Col>
                            <Col>
                                <SigningForm
                                    scopes={consultationData.scopes}
                                    currentOption={currentOption}
                                    setCurrentOption={setCurrentOption}
                                    currentScope={currentScope}
                                    setCurrentScope={setCurrentScope}
                                />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn-modal btn-cancel"
                            variant="none"
                            onClick={() => {
                                setShowSign(false);
                                setShow(true);
                            }}
                        >
                            <Icon icon="mdi:arrow-u-left-top" />
                            <span className="btn-text">Wróć</span>
                        </Button>

                        {withSign && (
                            <Button className="btn-modal" variant="none" onClick={submitForm}>
                                <Icon icon="mdi:pen" />
                                <span className="btn-text">Zapisz się</span>
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export function Title({ text, icon }: { text: string; icon?: string }) {
    return (
        <span className="title">
            {icon && <Icon icon={icon} />}
            {text}
        </span>
    );
}
