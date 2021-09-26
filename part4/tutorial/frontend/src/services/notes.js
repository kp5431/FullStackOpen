import axios from 'axios'
const baseUrl = '/api/notes' //relative url

// const getAll = () => {
//     const request = axios.get(baseUrl)
//     return request.then(response => response.data) //remember that request is a promise. also note that then() returns a promise as well
// }
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
// eslint-disable-next-line
export default {getAll, create, update}