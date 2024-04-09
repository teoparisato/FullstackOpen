import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const create = (personObject) => {
    return axios.post(baseUrl, personObject)
        .then(response => response.data)
}

const deletePerson = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`)
        .then(response => response.data)
}

const update = (personId, changedPerson) => {
    return axios.put(`${baseUrl}/${personId}`, changedPerson)
        .then(response => response.data)

}

export default {getAll, create, deletePerson, update}