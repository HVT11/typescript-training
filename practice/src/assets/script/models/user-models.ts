import { IFileImage } from './../interface/IFileImage';
import { IModel } from '../interface/IModel';
import { IUser } from '../interface/IUser';
import {fetchUsers, createUser, removeUser, updateUser, uploadAvatar} from '../servers/users'

export default class Model implements IModel {
    users: Promise<IUser[] | undefined>
    constructor() {
        this.users = fetchUsers()
    }

    /**
     * @desc Get users
     * @return {Promise} Return Promise
     */
    getUsers = (): Promise<IUser[] | undefined> =>{
        this.users = fetchUsers()
        return this.users
    }

    /**
     * @desc Add new user
     * @param {string} name username of user that you want to add
     * @return {Promise} Return Promise
     */
    addNewUser = async (name: string): Promise<Pick<IUser, 'id'> | undefined>=>{
        const user = {
            name: name
        }
        return createUser(user)
    }

    /**
     * @desc Edit user
     * @param {object} user user data that you have changed
     * @return {Promise} Return Array of users
     */
    editUser = (id: number, user: IUser): Promise<Pick<IUser, 'id'> | undefined> =>{
        return updateUser(id, user)
    }

    /**
     * @desc Upload image
     * @param {number} id Id of user
     * @param {FormData} file
     */
    uploadImg = async (id: number, file: FormData): Promise<IFileImage | undefined> => {
        return uploadAvatar(id, file)
    }

    /**
     * @desc Delete user
     * @param {number} id Id of user that you want to delete
     * @return {Promise} Return Promise
     */
    deleteUser = (id: number): Promise<Pick<IUser, 'id'> | undefined> =>{
        return removeUser(id)
    }

    /**
     * @desc Find user
     * @param {number} id Id of user that you want to find
     * @return {Promise} Return Object
     */
    
    findUser = async(id: number): Promise<IUser | undefined> => {
        return (await this.users)!.find((user: IUser) => user.id === id)
    }

    /**
     * @desc Search users
     * @param {string} input Keyword to search
     * @return {Promise} Return Array
     */
    searchUser = async(input: string): Promise<IUser[] | undefined> => {
        return (await this.users)!.filter((user: IUser) => user.name.search(input) >= 0)
    }
}