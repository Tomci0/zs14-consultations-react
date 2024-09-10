import { useState } from 'react';

import { Form, FloatingLabel } from 'react-bootstrap';

import { Title } from './index';

import IScope from '../../../../types/scope.types';

export default function SigningForm({
    scopes,
    currentOption,
    setCurrentOption,
    currentScope,
    setCurrentScope,
}: {
    scopes?: IScope[];
    currentOption: string;
    setCurrentOption: (currentOption: string) => void;
    currentScope: string | number;
    setCurrentScope: (currentScope: string | number) => void;
}) {
    const [showText, setShowText] = useState<boolean>(false);
    const [showSelect, setShowSelect] = useState<boolean>(false);

    let scopesByTypes: { [key: string]: IScope[] } = {};

    scopes?.forEach((scope) => {
        if (!scopesByTypes[scope.type.name]) {
            scopesByTypes[scope.type.name] = [];
        }

        scopesByTypes[scope.type.name].push(scope);
    });

    function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentScope('');
        setCurrentOption(e.target.value);

        const currentOption = e.target.value;

        if (currentOption === 'other') {
            setShowText(true);
            setShowSelect(false);
        } else {
            setShowText(false);
            setShowSelect(true);
        }
    }

    return (
        <div className="signing-form">
            <Title text="Cel Wizyty:" icon="mdi:info" />

            <div className="select-group">
                {Object.keys(scopesByTypes).map((type) => {
                    return (
                        <Form.Check
                            inline
                            label={type}
                            name="group1"
                            type={'radio'}
                            onChange={handleUpdate}
                            value={type}
                        />
                    );
                })}

                <Form.Check inline label="Inne" name="group1" type={'radio'} onChange={handleUpdate} value={'other'} />

                {showText ? (
                    <FloatingLabel label="Powód">
                        <Form.Control
                            as="textarea"
                            style={{ height: '5rem' }}
                            className="additional-input"
                            onChange={(e) => setCurrentScope(e.target.value)}
                        />
                    </FloatingLabel>
                ) : (
                    ''
                )}
                {showSelect ? (
                    <Form.Select
                        size="sm"
                        className="additional-input"
                        onChange={(e) => setCurrentScope(e.target.value)}
                        value={currentScope}
                    >
                        <option value={''}>Wybierz Opcję</option>

                        {scopesByTypes[currentOption].map((scope) => {
                            return <option value={scope._id}>{scope.name}</option>;
                        })}
                    </Form.Select>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
