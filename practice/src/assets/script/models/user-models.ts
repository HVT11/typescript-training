import { User } from './../interface/user';
import { AxiosResponse } from 'axios'
import {fetchUsers, createUser, removeUser, updateUser, uploadAvatar} from '../servers/users'

export default class Model {
    users: Promise<any>
    constructor() {
        this.users = fetchUsers()
    }

    /**
     * @desc Get users
     * @return {Promise} Return Promise
     */
    getUsers = (): Promise<any> => {
        this.users = fetchUsers()
        return this.users
    }

    /**
     * @desc Add new user
     * @param {string} name username of user that you want to add
     * @return {Promise} Return Promise
     */
    addNewUser = async (name: string): Promise<any>=>{
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
    editUser = (id: number, user: object): Promise<any> =>{
        return updateUser(id, user)
    }

    /**
     * @desc Edit user
     * @param {number} id Id of user
     * @param {FormData} file
     */
    uploadImg = async (id: number, file: FormData) => {
        return uploadAvatar(id, file)
    }

    /**
     * @desc Delete user
     * @param {number} id Id of user that you want to delete
     * @return {Promise} Return Promise
     */
    deleteUser = (id: number): Promise<any> =>{
        return removeUser(id)
    }

    /**
     * @desc Find user
     * @param {number} id Id of user that you want to find
     * @return {Promise} Return Object
     */
    
    findUser = async(id: number): Promise<any> => {
        return (await this.users).find((user: User) => user.id === id)
    }

    /**
     * @desc Search users
     * @param {string} input Keyword to search
     * @return {Promise} Return Array
     */
    searchUser = async(input: string): Promise<any> => {
        return (await this.users).filter((user: User) => user.name.search(input) >= 0)
    }
}