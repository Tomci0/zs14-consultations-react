import React from 'react';
import './main.scss';

import NavItem from './nav-item';
import User from './user';
import Logo from './logo';
import Navigation from './navigation';

import IHeader from '../../types/header.type';

export default function Header({ name, image, isTeacher, isAdmin, active }: IHeader) {
    return (
        <div id="navbar">
            <Logo />

            <Navigation>
                <NavItem icon="mdi:home" name="Strona Główna" href="/" active={active === '/'} />
                <NavItem
                    icon="mdi:calendar"
                    name="Kalendarz Konsultacji"
                    href="/calendar"
                    active={active === '/calendar'}
                />
            </Navigation>

            <User name={name} image={image} isTeacher={isTeacher} isAdmin={isAdmin} />
        </div>
    );
}
