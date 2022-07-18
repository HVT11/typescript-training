import { IUser } from './IUser';
export interface IView {

    //method
    bindOpenModalAddUser: () => void
    bindCloseModalAddUser: () => void
    bindOpenFormEdit: () => void
    bindCloseFormEdit: () => void
    bindOpenSearch: () => void
    bindCloseSearch: () => void
    bindToggleStatus: () => void
    disableSub: () => void

    renderUsers: (users: Array<IUser> | undefined) => void
    viewDetail: (user: IUser | undefined) => void
    viewImage: (url: string) => void
    bindAddNewUser: (handler: (input:string) => void) => void
    bindEditUser: (handler: (id: number, user: IUser) => void) => void
    bindDeleteUser: (handler: (id: number) => void) => void
    bindRowDataUser: (handler: (id:number) => void) => void
    bindSearchUser: (handler: (input:string) => void) => void
    bindUploadImage: (handler: (id: number, file: File) => void) => void
}