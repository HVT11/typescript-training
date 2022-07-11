import {fetchUsers, createUser, removeUser, updateUser, uploadAvatar} from '../servers/users'

export default class Model {
    constructor() {
        this.users = fetchUsers()
    }

    /**
     * @desc Get users
     * @return {Promise} Return Promise
     */
    getUsers = () => {
        this.users = fetchUsers()
        return this.users
    }

    /**
     * @desc Add new user
     * @param {string} name username of user that you want to add
     * @return {Promise} Return Promise
     */
    addNewUser = async (name)=>{
        const user = {
            name: name
        }
        return createUser(user)
    }

    /**
     * @desc Edit user
     * @param {object} user user data that you have changed
     * @return {Array} Return Array of users
     */
    editUser = (id, user) =>{
        return updateUser(id, user)
    }

    /**
     * @desc Edit user
     * @param {number} id Id of user
     * @param {FormData} file
     */
    uploadImg = async (id, file) => {
        return uploadAvatar(id, file)
    }

    /**
     * @desc Delete user
     * @param {int} id Id of user that you want to delete
     * @return {Promise} Return Promise
     */
    deleteUser = (id) =>{
        return removeUser(id)
    }

    /**
     * @desc Find user
     * @param {int} id Id of user that you want to find
     * @return {Object} Return Object
     */
    findUser = async(id) => {
        return (await this.users).find(user => user.id === id)
    }

    /**
     * @desc Search users
     * @param {string} input Keyword to search
     * @return {Array} Return Array
     */
    searchUser = async(input) => {
        return (await this.users).filter(user => user.name.search(input) >= 0)
    }
}