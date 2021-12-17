import axios from 'axios'

export default {
    provide: 'http',
    useValue: axios.create({baseURL: 'https://eu1.locationiq.com/v1'})
}