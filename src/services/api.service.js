import axios from 'axios'
import TokenService from '../services/storage.service'

const ApiService = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
        axios.defaults.headers.common["Content-Type"] = 'application/json'
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },
}

export default ApiService