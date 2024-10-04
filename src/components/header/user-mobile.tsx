import { useState } from 'react';

import { Icon } from '@iconify/react';
import Dropdown from 'react-bootstrap/Dropdown';

import IUser from '../../types/user.type';

import useAuth from '../../services/useAuth';
import { NavLink } from 'react-router-dom';
import useUserActions from '../../hooks/userActions';

export default function UserMobile() {
    const { user } = useAuth();
    const { handleLogout } = useUserActions();
    return (
        <Dropdown as="span" drop={'down-centered'}>
            <Dropdown.Toggle as={'a'} className="nav-item user">
                <div className="image">
                    <img className="avatar" src={user.image} alt="avatar" />
                </div>
                <div className="info">
                    <span className="name">{user.name}</span>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
                popperConfig={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 30],
                            },
                        },
                    ],
                }}
            >
                <Dropdown.Item onClick={handleLogout}>
                    <Icon className="icon" icon="mdi:logout" />
                    <span className="name">Wyloguj się</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
