import { IFileImage } from './IFileImage';
import { IUser } from './IUser';
export interface IModel {
    users: Promise<IUser[] | undefined>

    getUsers: () => Promise<IUser[] | undefined>
    addNewUser: (name: string) => Promise<Pick<IUser, 'id'> | undefined>
    editUser: (id: number, user: IUser) => Promise<Pick<IUser, 'id'> | undefined>
    uploadImg: (id: number, file: FormData) => Promise<IFileImage | undefined>
    deleteUser: (id: number) => Promise<Pick<IUser, 'id'> | undefined>
    findUser: (id: number) => Promise<IUser | undefined>
    searchUser: (input: string) => Promise<IUser[] | undefined>
}