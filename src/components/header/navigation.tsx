import React from 'react';

export default function Navigation({ children }: { children: React.ReactNode }) {
    return (
        <div id="navigation" className={'d-none d-lg-flex order-1 flex-grow-1 justify-content-center'}>
            <ul className={'nav nav-pills'}>{children}</ul>
        </div>
    );
}
