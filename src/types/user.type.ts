export default interface IUser {
    _id?: string;
    name?: string;
    image?: string;
    isTeacher?: boolean;
    isClassTeacher?: boolean;
    isAdmin?: boolean;
    class?: string;
    isLogged?: boolean;
}
