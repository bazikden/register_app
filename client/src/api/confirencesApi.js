import axios from 'axios'

export const api = axios.create({})

const baseUrl = 'http://localhost:5000/confirences'

class ConfirencesApi {
    static getConf() {
        return baseUrl
    }
    static addConf() {
        return `${baseUrl}/add`
    }
    static setStatus() {
        return `${baseUrl}/setstatus`
    }
}

export default ConfirencesApi