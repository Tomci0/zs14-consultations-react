import useAuth from '../services/useAuth';

export default function useUserActions() {
    const { logout } = useAuth();

    return {
        handleLogout: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            ev.preventDefault();
            logout();
        },
    };
}
