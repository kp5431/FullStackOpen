/*
This file serves as an abstraction layer for communicating
with the backend server
*/

import axios from 'axios'
const baseUrl = '/api/persons'

/*
This function returns all of the people objects in the database
*/
const getAll = () => {
    const request = axios.get(baseUrl) //capture all the data
    return request.then(resp => resp.data) //return just the data
}
/*
This function adds a new person object to the database
*/
const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(resp => resp.data)
}

/*
This function updates a particular person object
in the database
*/
const update = (id, newPersonVersion) => {
    const request = axios.put(`${baseUrl}/${id}`, newPersonVersion)
    return request.then(resp => resp.data)
}

/*
This function deletes a person object
out of the database
*/
const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(resp => resp.data)
}

const personService = {
    getAll,
    create,
    update,
    del
}

export default personService