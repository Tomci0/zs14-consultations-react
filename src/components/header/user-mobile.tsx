import { useState } from 'react';

import { Icon } from '@iconify/react';
import Dropdown from 'react-bootstrap/Dropdown';

import IUser from '../../types/user.type';

import useAuth from '../../services/useAuth';

export default function UserMobile() {
    const { user } = useAuth();
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

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
