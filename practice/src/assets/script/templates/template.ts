import { IUser } from '../interface/IUser';
import {USER_STATUS_ACTIVE} from "../constants/classname"
export default class Template {
    defautTemplate: string
    constructor() {
        this.defautTemplate
        = `<tr class="table__row table-body-row" id="{{id}}">
                <td class="table__col">
                    {{avatar}}
                </td>
                <td class="table__col">{{username}}</td>
                <td class="table__col">
                    <div class="label__status {{status-color}}">{{status}}</div>
                </td>
                    <td class="table__col">{{email}}</td>
           </tr>`
    }

    checkStatusText(status: number) {
        if(status) {
            return "Active"
        }
        else {
            return "Not active"
        }
    }

    checkStatusColor(status: number) {
        if(status) {
            return USER_STATUS_ACTIVE
        }
        else {
            return ""
        }
    }

    checkAvatar(url: string, username: string) {
        if(url !== '') {
            return `<img src="${url}" alt="" class="avatar avatar-small">`
        }
        else {
            return `<div class="avatar avatar-small">${username.charAt(0).toUpperCase()}</div>`
        }
    }

    renderListUser(data: Array<IUser>) {
        let view = ''
        data.forEach(user => {
            let template = this.defautTemplate
            template = template.replace('{{id}}', user.id!.toString())
            template = template.replace('{{avatar}}', this.checkAvatar(user.avatar, user.name))
            template = template.replace('{{email}}', user.email)
            template = template.replace('{{username}}', user.name)
            template = template.replace('{{status}}', this.checkStatusText(user.status))
            template = template.replace('{{status-color}}', this.checkStatusColor(user.status))
            view = view + template
        })
        return view
    }
}

