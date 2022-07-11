import axios from 'axios'
import { BASE_URL_API, STATUS_CODE} from '../constants/api'

axios.defaults.baseURL = BASE_URL_API

/**
 * @des Fetch data user from base URL
 * @returns {Promise}
 */
const fetchUsers = async() => {
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
const createUser = async(payload) => {
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
const removeUser = async(id) => {
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
const updateUser = async (id, payload) => {
    try {
        const response = await axios.put(`/users/${id}`, payload)
        if (response.status === STATUS_CODE.OK) {
            return response.data
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
const uploadAvatar = async (id, payload) => {
    try {
        const response = await axios.post(`/users/${id}/avatar`, payload)
        if (response.status === STATUS_CODE.OK) {
            return response.data
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