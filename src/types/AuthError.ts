export default class AuthError {
    public isLogged: boolean = false;
    constructor() {
        console.log('Error: User is not logged in');
    }
}
