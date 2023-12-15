// ../services/blogs.js
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
    console.log('in service blogs token set to:', token)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log(
        'Service: rin create, newObject and config (token)',
        newObject,
        config
    )
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
    console.log('respnse in service create', response)
}

// put request to update likes
const updateLikes = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log('in updateLikes, id and config (token)', id, config)

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

// delete request to delete blog
const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, create, setToken, updateLikes, deleteBlog }
