import { useState } from 'react';

import ThemeChanger from '../../theme-changer';
import Dropdown from 'react-bootstrap/Dropdown';
import { Icon } from '@iconify/react';
import AuthenticationCard from '../AuthenticationCard';

export default function AuthButton() {
    const [dropped, setDropped] = useState(false);

    return (
        <div id="user" className="order-lg-3 order-3">
            <ThemeChanger />

            <Dropdown align={{ lg: 'end' }} show={dropped}>
                <button className="btn login-btn" onClick={() => setDropped(!dropped)}>
                    Zaloguj Się
                    <Icon icon={!dropped ? 'bxs:chevron-down' : 'bxs:chevron-up'} />
                </button>

                <Dropdown.Menu
                    renderOnMount={true}
                    popperConfig={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-8, 25],
                                },
                            },
                        ],
                    }}
                >
                    <AuthenticationCard />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
