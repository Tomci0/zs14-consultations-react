import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingOverlay.css'; // Dodamy tu nasze style

const LoadingOverlay = ({
    isLoading,
    children,
    size,
}: {
    isLoading: boolean;
    children: React.ReactNode;
    size?: 'sm';
}) => {
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            {/* Kontener dla głównej zawartości */}
            <div className={`content ${isLoading ? 'content-blurred' : ''}`}>{children}</div>

            {/* Spinner widoczny tylko podczas ładowania */}
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Spinner animation="grow" variant="primary" size={size} />
                </div>
            )}
        </div>
    );
};

export default LoadingOverlay;
