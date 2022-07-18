import { IView } from './../interface/IView';
import { IModel } from './../interface/IModel';
import { IUser } from '../interface/IUser';

export default class Controllers {
    activeRoute: string | undefined
    constructor(public model: IModel, public view: IView) {
        this.model = model
        this.view = view
        
        this.view.bindOpenModalAddUser()        
        this.view.bindCloseModalAddUser()
        this.view.bindOpenFormEdit()
        this.view.bindCloseFormEdit()
        this.view.bindOpenSearch()
        this.view.bindCloseSearch()
        this.view.bindToggleStatus()
        
        this.view.bindAddNewUser(this.handleAddNewUser)
        this.view.bindEditUser(this.handleEditUser)
        this.view.bindDeleteUser(this.handleDeleteUser)
        this.view.bindRowDataUser(this.handleViewUserDeTail)
        this.view.bindSearchUser(this.handleSearchUser)
        this.view.bindUploadImage(this.handleUploadImage)
        
        this.renderListUsers(this.model.users)
    }

    setView(raw:string) {
        const route = raw.replace(/^#\//, '')
        this.activeRoute = route
    }

    renderListUsers = async(users: Promise<IUser[] | undefined>) => {
        if(users){
            this.view.renderUsers(await users)
        }
    }

    handleViewUserDeTail = async(id: number) => { 
        this.view.viewDetail(await this.model.findUser(id))
    }

    handleAddNewUser = async(name: string) => {
        await this.model.addNewUser(name)
        this.renderListUsers(this.model.getUsers())
    }

    handleEditUser = async(id: number, user: IUser) => {
        await this.model.editUser(id, user)
        this.view.disableSub()
        this.renderListUsers(this.model.getUsers())
    }

    handleUploadImage = async (id: number, file: File) => {
        const formData = new FormData()
        formData.append('upload', file)
        formData.append('upload_fullpath', file.name)
        const data = await this.model.uploadImg(id, formData)
        this.view.viewImage(data!.value)
    }

    handleDeleteUser = async (id: number) => {
        await this.model.deleteUser(id)
        this.view.disableSub()
        this.renderListUsers(this.model.getUsers())
    }

    handleSearchUser = (inputText: string) => {
        const result = this.model.searchUser(inputText)
        this.renderListUsers(result)
    }
}
