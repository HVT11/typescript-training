import * as helper from "../helpers/helper"
import * as variables from "../constants/classname"
import Template from "../templates/template"
import { IUser } from "../interface/IUser"
import { IView } from "../interface/IView"

export default class View implements IView {
    template: Template
    detailStatus: HTMLElement
    detailName: HTMLElement
    detailAvatar: HTMLElement
    detailEmail: HTMLElement

    appMain: HTMLElement
    appSub: HTMLElement

    title: HTMLElement
    search: HTMLElement

    infoView: HTMLElement
    infoEdit: HTMLElement
    listUser: HTMLElement

    inputUsername: HTMLInputElement
    inputSearch: HTMLInputElement
    editName: HTMLInputElement
    editEmail: HTMLInputElement
    editAvatarImg: HTMLInputElement
    editAvatarUrl: HTMLInputElement
    editCheckStatus: HTMLInputElement
    editStatus: HTMLInputElement

    btnSearch: HTMLElement
    btnCancelSearch: HTMLElement
    btnDelete: HTMLElement
    btnSave: HTMLElement
    btnEdit: HTMLElement
    btnBack: HTMLElement
    btnAddUser: HTMLElement
    btnOpenFormAdd: HTMLElement
    btnCloseFormAdd: HTMLElement

    modal: HTMLElement
    constructor(template: Template) {
        this.template = template
        
        this.detailStatus = helper.getElement('#detail-status')
        this.detailName = helper.getElement('#detail-name')
        this.detailAvatar = helper.getElement('#detail-avatar')
        this.detailEmail = helper.getElement('#detail-email')

        this.appMain = helper.getElement('#app-main')
        this.appSub = helper.getElement('#app-sub')

        this.title = helper.getElement('#title')
        this.search = helper.getElement('#search')

        this.infoView = helper.getElement('#info-view')
        this.infoEdit = helper.getElement('#info-edit')

        this.listUser = helper.getElement('#list-user')
        this.inputUsername = helper.getInputElement('#input-username')
        this.inputSearch = helper.getInputElement('#input-search')

        this.editName = helper.getInputElement('#edit-name')
        this.editEmail = helper.getInputElement('#edit-email')
        this.editAvatarImg = helper.getInputElement('#edit-avatar-img')
        this.editAvatarUrl = helper.getInputElement('#edit-avatar-url')
        this.editCheckStatus = helper.getInputElement('#edit-check-status')
        this.editStatus = helper.getInputElement('#edit-status')

        this.btnSearch = helper.getElement('#btn-search')
        this.btnCancelSearch = helper.getElement('#btn-cancel-search')
        this.btnDelete = helper.getElement('#btn-delete')
        this.btnSave = helper.getElement('#btn-save')
        this.btnEdit = helper.getElement('#btn-edit')
        this.btnBack = helper.getElement('#btn-back')
        this.btnAddUser = helper.getElement('#btn-add-user')
        this.btnOpenFormAdd = helper.getElement('#btn-open-form-add')
        this.btnCloseFormAdd = helper.getElement('#btn-close-form-add')
        
        this.modal = helper.getElement('#modal')
    }

    openModal() {
        this.modal.classList.add(variables.MODAL_ACTIVE)
    }

    closeModal() {
        this.modal.classList.remove(variables.MODAL_ACTIVE)
    }

    enableSub() {
        this.appMain.className = 'grid__column-7'
        this.appSub.className = 'grid__column-3'
        this.appSub.style.display = 'block'
    }

    disableSub() {
        this.appMain.className = 'grid__column-max'
        this.appSub.style.display = 'none'
    }

    openFormEdit() {
        this.infoView.classList.remove(variables.INFO_ACTIVE)
        this.infoEdit.classList.add(variables.INFO_ACTIVE)
    }

    closeFormEdit() {
        this.infoEdit.classList.remove(variables.INFO_ACTIVE)
        this.infoView.classList.add(variables.INFO_ACTIVE)
    }

    openSearch() {
        this.title.style.display = 'none'
        this.search.style.display = 'flex'
    }

    closeSearch() {
        this.title.style.display = 'flex'
        this.search.style.display = 'none'
    }

    onToggleStatus(element: HTMLElement) {
        if(this.editCheckStatus.checked) {
            element.innerHTML = 'Active'
            element.classList.add(variables.USER_STATUS_ACTIVE)
        }
        else{
            element.innerHTML = 'Not active'
            element.classList.remove(variables.USER_STATUS_ACTIVE)
        }
    }

    onChangeImg(inputUrl: string, element: HTMLElement) {
        element.innerHTML = ""
        element.style.backgroundImage = `url('${inputUrl}')`
    }
      
    resetInput() {
        this.inputUsername.value = ''
    }

    renderUsers(users: Array<IUser> | undefined) {
        this.listUser.innerHTML = ''
        if(users){
            if (users.length === 0) {
                const p = helper.createElement('p')
                p.textContent = 'Not have user! Add a new user ?'
                this.listUser.append(p)
            }
            else {
                this.listUser.innerHTML = this.template.renderListUser(users)
            }
        }
    }

    getInputName() {
        return helper.getInput(this.inputUsername)
    }

    eventAddUser(handler:(input:string) => void) {
        if (this.getInputName() !== '') {
            handler(this.getInputName())
            this.resetInput()
            this.closeModal()
        }
    }

    bindAddNewUser(handler: (input:string) => void) {
        helper.on(this.btnAddUser, 'click', event => {
            this.eventAddUser(handler)
        })

        this.inputUsername.addEventListener('keypress', (event: KeyboardEvent) => {
            if(event.key === 'Enter') {
                event.preventDefault()
                this.eventAddUser(handler)
            }
        })
    }

    bindOpenModalAddUser() {
        this.btnOpenFormAdd.addEventListener('click', event => {
            this.openModal()
            this.inputUsername.focus()
        })
    }

    bindCloseModalAddUser() {
        this.btnCloseFormAdd.addEventListener('click', event => {
            this.resetInput()
            this.closeModal()
        })
    }

    bindOpenFormEdit() {
        this.btnEdit.addEventListener('click', event => {
            this.openFormEdit()
        })
    }

    bindCloseFormEdit() {
        this.btnBack.addEventListener('click', event => {
            this.closeFormEdit()
        })
    }

    bindOpenSearch() {
        this.btnSearch.addEventListener('click', event => {
            this.openSearch()
            this.inputSearch.focus()
        })
    }

    bindCloseSearch() {
        this.btnCancelSearch.addEventListener('click', event => {
            this.closeSearch()
            location.reload()
        })
    }

    bindToggleStatus() {
        this.editCheckStatus.addEventListener('change', event => {
            this.onToggleStatus(this.editStatus)
        })
    }

    bindRowDataUser(handler: (id:number)=> void) {
        helper.delegate(this.listUser, '.table-body-row', 'click', (event: Event,element: HTMLElement) => {
            const id = helper.getId(element)
            this.enableSub()
            helper.getElementAll('.table__row').forEach(element => {
                if(element.classList.contains(variables.TABLE_ROW_ACTIVE)) {
                    element.classList.remove(variables.TABLE_ROW_ACTIVE)
                }
            })
            element.classList.add(variables.TABLE_ROW_ACTIVE)
            handler(id)
        })
    }

    viewDetail(user: IUser | undefined) {
        if(user){
            //Validate avatar url
            if(helper.validateAvatarUrl(user.avatar, this.detailAvatar)) {
                this.detailAvatar.style.backgroundImage = `url('${user.avatar}')`
            }
            else {
                this.detailAvatar.innerHTML = user.name.charAt(0).toUpperCase()
            }
    
            if(helper.validateAvatarUrl(user.avatar, this.editAvatarImg)) {
                this.editAvatarImg.style.backgroundImage = `url('${user.avatar}')`
            }
            else {
                this.editAvatarImg.innerHTML = user.name.charAt(0).toUpperCase()
            }
            
            //Validate status
            helper.validateStatus(user.status, this.detailStatus, variables.USER_STATUS_ACTIVE)
            helper.validateStatus(user.status, this.editStatus, variables.USER_STATUS_ACTIVE)
            helper.toggleStatus(user.status, this.editCheckStatus)
            
    
            //Validate email
            helper.validateEmail(user.email, this.detailEmail)
            this.editEmail.value = user.email
            
            this.detailName.textContent = user.name
            this.editName.value = user.name
        }
    }

    viewImage(url: string) {
        this.onChangeImg(url, this.editAvatarImg)
        this.onChangeImg(url, this.detailAvatar)
    }

    bindEditUser(handler: (id: number, user: IUser) => void) {
        this.btnSave.addEventListener('click', event => {
            const id = helper.getIdRowActive()
            const user: IUser = {
                name: helper.getInput(this.editName),
                email: helper.getInput(this.editEmail),
                status: (helper.getCheckbox(this.editCheckStatus) === true ? 1 : 0),
                avatar: ''
            } 
            handler(id, user)
        })
    }

    bindUploadImage(handler: (id: number, file: File) => void) {
        this.editAvatarUrl.addEventListener('change', event => {
            const id = helper.getIdRowActive()
            if(this.editAvatarUrl.files){
                const file = this.editAvatarUrl.files[0]
                handler(id, file)
            }
        })
    }

    bindDeleteUser(handler: (id: number) => void) {
        this.btnDelete.addEventListener('click', event => {
            handler(helper.getIdRowActive())
        })
    }

    bindSearchUser(handler: (input: string) => void) {
        this.inputSearch.addEventListener('input', event => {
            let input = helper.getInput(this.inputSearch)
            handler(input)
        })
    }
}