import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://tamz.test.beaverlyhills.eu/',
        timeout: 10000,
    })
}

