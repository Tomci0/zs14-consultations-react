import { useState } from 'react';
import './main.scss';

import { Icon } from '@iconify/react';

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
import LoginModal from './modals/LoginModal';

import { VerifyProvider } from '../../services/useVerify';

export default function Header({ active }: IHeader) {
    const { user, isLogged } = useAuth();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

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

                    {isLogged ? <User /> : <AuthButton />}
                </Desktop>

                <Mobile>
                    <div className="mobile-nav-indicator">
                        <a className="link-body-emphasis text-decoration-none" onClick={() => setCollapsed(!collapsed)}>
                            <Icon icon={!collapsed ? 'mdi:menu' : 'mdi:close'} />
                        </a>
                    </div>

                    <MobileNavigation collapsed={collapsed}>
                        <VerifyProvider>
                            <MobileNavItem icon="mdi:home" name="Strona Główna" href="/" active={active === '/'} />
                            <MobileNavItem
                                icon="mdi:calendar"
                                name="Kalendarz Konsultacji"
                                href="/calendar"
                                active={active === '/calendar'}
                            />
                            {isLogged && (
                                <MobileNavItem
                                    icon="mdi:chair-school"
                                    name="Twoje Konsultacje"
                                    href="/consultations"
                                    active={active === '/consultations'}
                                />
                            )}

                            {isLogged && (user.isAdmin || user.isTeacher) && (
                                <MobileNavItem icon="mdi:shield-user" name="Panel Administratora" href="/admin" />
                            )}

                            {isLogged ? (
                                <UserMobile />
                            ) : (
                                <MobileNavItem icon="mdi:login" name="Zaloguj się" onClick={() => setShow(true)} />
                            )}

                            <LoginModal show={show} setShow={setShow} />
                        </VerifyProvider>
                    </MobileNavigation>
                    <User />
                </Mobile>
            </div>
        </>
    );
}
