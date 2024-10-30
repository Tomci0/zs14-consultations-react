import { Navigate, Route } from 'react-router-dom';
import useAuth from '../services/useAuth';

function PrivateRoute({ element, ...rest }: { element: JSX.Element; path: string }) {
    const { user, isLogged } = useAuth();

    // Sprawdzanie, czy użytkownik jest zalogowany
    // if (isLogged == false) {
    //     // Jeśli nie jest, przekieruj np. na stronę główną
    //     return <Navigate to="/" replace />;
    // }

    // Jeśli jest zalogowany, zwróć komponent Route z przekazanym elementem
    return <Route {...rest} element={element} />;
}

export default PrivateRoute;
