import { useState } from 'react';

import { Icon } from '@iconify/react';
import Dropdown from 'react-bootstrap/Dropdown';

import IUser from '../../types/user.type';

export default function UserMobile({ userData }: { userData: IUser }) {
    return (
        <Dropdown as="span" drop={'down-centered'}>
            <Dropdown.Toggle as={'a'} className="nav-item user">
                <div className="image">
                    <img className="avatar" src={userData.image} alt="avatar" />
                </div>
                <div className="info">
                    <span className="name">{userData.name}</span>
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
