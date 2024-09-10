import { useState } from 'react';
import { Icon } from '@iconify/react';

import Collapse from 'react-bootstrap/Collapse';

export default function MobileNavigation({ collapsed, children }: { collapsed: boolean; children: React.ReactNode }) {
    return (
        <>
            <Collapse in={collapsed}>
                <div className="mobile-navigation">
                    <div className="navigation-container">{children}</div>
                </div>
            </Collapse>
        </>
    );
}
