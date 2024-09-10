import React from 'react';

import { Title } from './index';
import { Icon } from '@iconify/react';

import IScope from '../../../../types/scope.types';

export default function Scopes({ scopes, description }: { scopes?: IScope[]; description?: string }) {
    let scopesByTypes: { [key: string]: IScope[] } = {};

    scopes?.forEach((scope) => {
        if (!scopesByTypes[scope.type.name]) {
            scopesByTypes[scope.type.name] = [];
        }

        scopesByTypes[scope.type.name].push(scope);
    });

    return (
        <div className="description-scopes">
            <div className="scopes">
                <Title text="Zakres Materiału:" icon="mdi:book-open" />
                <div className="scopes-list">
                    {Object.keys(scopesByTypes).map((type) => {
                        return (
                            <>
                                <LabelScope scope={type} />
                                {scopesByTypes[type].map((scope, index) => (
                                    <Scope scope={scope.name} />
                                ))}
                            </>
                        );
                    })}
                </div>
            </div>
            <div className="description">
                <Title text="Opis:" icon="mdi:file-document" />
                <span>{description}</span>
            </div>
        </div>
    );
}

function Scope({ scope }: { scope: string }) {
    return (
        <div className="scope">
            <Icon icon="mdi:circle" />
            <span>{scope}</span>
        </div>
    );
}

function LabelScope({ scope }: { scope: string }) {
    return (
        <div className="scope label">
            <span>{scope}</span>
        </div>
    );
}
