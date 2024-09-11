import { useState } from 'react';
import './main.scss';

import { Icon } from '@iconify/react';
import { useMediaQuery } from 'react-responsive';

import NavItem from './nav-item';
import User from './user';
import Logo from './logo';
import Navigation from './navigation';

import MobileNavigation from './mobile-navigation';
import MobileNavItem from './mobile-nav-item';
import UserMobile from './user-mobile';

import IHeader from '../../types/header.type';

import { Mobile, Desktop } from '../../constants/functions';
import AuthButton from './AuthButton';
import useAuth from '../../services/useAuth';

export default function Header({ active }: IHeader) {
    const { user, isLogged } = useAuth();
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <>
            <div id="navbar">
                <Logo />

                <Desktop>
                    <Navigation>
                        <NavItem icon="mdi:home" name="Strona Główna" href="/" active={active === '/'} />
                        <NavItem
                            icon="mdi:calendar"
                            name="Kalendarz Konsultacji"
                            href="/calendar"
                            active={active === '/calendar'}
                        />

                        {isLogged ? (
                            <NavItem
                                icon="mdi:chair-school"
                                name="Twoje Konsultacje"
                                href="/consultations"
                                active={active === '/consultations'}
                            />
                        ) : (
                            ''
                        )}
                    </Navigation>
                </Desktop>

                <Mobile>
                    <a className="link-body-emphasis text-decoration-none" onClick={() => setCollapsed(!collapsed)}>
                        <Icon icon={!collapsed ? 'mdi:menu' : 'mdi:close'} />
                    </a>
                    <MobileNavigation collapsed={collapsed}>
                        <MobileNavItem icon="mdi:home" name="Strona Główna" href="/" active={active === '/'} />
                        <MobileNavItem
                            icon="mdi:calendar"
                            name="Kalendarz Konsultacji"
                            href="/calendar"
                            active={active === '/calendar'}
                        />
                        {isLogged ? (
                            <MobileNavItem
                                icon="mdi:chair-school"
                                name="Twoje Konsultacje"
                                href="/consultations"
                                active={active === '/consultations'}
                            />
                        ) : (
                            ''
                        )}

                        <UserMobile />
                    </MobileNavigation>
                </Mobile>

                {isLogged ? <User /> : <AuthButton />}

                {/* <User name={name} image={image} isTeacher={isTeacher} isAdmin={isAdmin} /> */}
            </div>
        </>
    );
}
