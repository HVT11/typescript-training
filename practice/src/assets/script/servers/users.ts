import { IFileImage } from './../interface/IFileImage';
import { IUser } from './../interface/IUser';
import axios from 'axios'
import { BASE_URL_API, STATUS_CODE} from '../constants/api'

axios.defaults.baseURL = BASE_URL_API

/**
 * @des Fetch data user from base URL
 * @returns {Promise}
 */
const fetchUsers = async(): Promise<IUser[] | undefined> => {
    try {
        const res = await axios.get('/users')
        if(res.status === STATUS_CODE.OK){
            return res.data
        }
        else {
            alert('Error')
        }
    }
    catch(error) {
        alert('Error')
    }
}

/**
 * @param {Object} payload
 * @returns {Promise}
 */
const createUser = async(payload: object): Promise<Pick<IUser, 'id'> | undefined> => {
    try {
        const res = await axios.post('/users', payload)
        if(res.status === STATUS_CODE.OK) {
            return res.data
        }
        else {
            alert('Error')
        }
    }
    catch(error) {
        alert('Error')
    }
}

/**
 * @param {number} id
 * @returns {Promise}
 */
const removeUser = async(id: number): Promise<Pick<IUser, 'id'> | undefined> => {
    try {
        const res = await axios.delete(`/users/${id}`)
        if(res.status === STATUS_CODE.OK) {
            return res.data
        }
        else {
            alert('Error')
        }
    }
    catch(error) {
        alert('Error')
    }
}

/**
 * @param {(string | number)} id
 * @param {Object} payload
 * @returns {Promise}
 */
const updateUser = async (id: (string | number), payload: object): Promise<Pick<IUser, 'id'> | undefined> => {
    try {
        const res = await axios.put(`/users/${id}`, payload)
        if (res.status === STATUS_CODE.OK) {
            return res.data
        } else {
            alert('Error')
        }
    }
    catch(error) {
        alert('Error')
    }
}

/**
 * @param {(string | number)} id
 * @param {Object} payload
 * @returns {Promise}
 */
const uploadAvatar = async (id: (string | number), payload: object): Promise<IFileImage | undefined> => {
    try {
        const res = await axios.post(`/users/${id}/avatar`, payload)
        if (res.status === STATUS_CODE.OK) {
            console.log(res.data)
            console.log(typeof res.data)
            return res.data
        } else {
            alert('Error')
        }
    }
    catch(error) {
        alert('Error')
    }
}

export {
    fetchUsers,
    createUser,
    removeUser,
    updateUser,
    uploadAvatar
}