import axios from 'axios'

export const userApi = axios.create({})
const baseUrl = "http://localhost:5000/admin/users"


export default class UsersApi{
    static findAll(){
        return baseUrl
    }
    static addUser(){
        return `${baseUrl}`
    }

    static updateUser(){
        return `${baseUrl}/update`
    }

    static updateUserStatus(){
        return `${baseUrl}/update-status`
    }

    static delUser(){
        return `${baseUrl}/delete`
    }
}