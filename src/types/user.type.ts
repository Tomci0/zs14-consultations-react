export default interface IUser {
    name: string;
    image?: string;
    isTeacher?: boolean;
    isClassTeacher?: boolean;
    isAdmin?: boolean;
    class?: string;
}
