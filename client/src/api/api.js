import axios from 'axios'



export const api = axios.create({})
const baseUrl = 'http://localhost:5000'




class AdminApi {
    static login() {
            return  `${baseUrl}/admin/login`
    }

    static auth(){
        return  `${baseUrl}/admin/auth`
    }


}


export default AdminApi