export default class Controllers {
    constructor(model, view) {
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
        this._activeRoute = ''
    }

    setView(raw) {
        const route = raw.replace(/^#\//, '')
        this._activeRoute = route
    }

    renderListUsers = async(users) => {
        this.view.renderUsers(await users)
    }

    handleViewUserDeTail = async(id) => { 
        this.view.viewDetail(await this.model.findUser(id))
    }

    handleAddNewUser = async(name) => {
        await this.model.addNewUser(name)
        this.renderListUsers(await this.model.getUsers())
    }

    handleEditUser = async(id, user) => {
        await this.model.editUser(id, user)
        this.view.disableSub()
        this.renderListUsers(await this.model.getUsers())
    }

    handleUploadImage = async (id, file) => {
        const formData = new FormData()
        formData.append('upload', file)
        formData.append('upload_fullpath', file.name)
        const data = await this.model.uploadImg(id, formData)
        this.view.viewImage(data.value)
    }

    handleDeleteUser = async (id) => {
        await this.model.deleteUser(id)
        this.view.disableSub()
        this.renderListUsers(await this.model.getUsers())
    }

    handleSearchUser = inputText => {
        const result = this.model.searchUser(inputText)
        this.renderListUsers(result)
    }
}
