import IUser from './user.type';

export default interface IHeader {
    userData:
        | IUser
        | {
              isLogged: boolean;
          };
    active: string;
    isLogged: boolean;
    setIsLogged: (show: boolean) => void;
}
