export default interface IHeader {
    name: string;
    image?: string;
    isTeacher?: boolean;
    isClassTeacher?: boolean;
    isAdmin?: boolean;
    class?: string;

    active: string;
}
