// ../services/blogs.js
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
    //console.log('in service blogs token set to:', token)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
    //console.log('token in getAll:', token)
}

const create = async (newObject) => {
    //console.log('Service: in create, newObject', newObject)
    const config = {
        headers: { Authorization: token },
    }
    // console.log(
    //     'Service: rin create, newObject and config (token)',
    //     newObject,
    //     config
    // )
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateLikes = async (blog) => {
    const id = blog.id
    const config = {
        headers: { Authorization: token },
    }
    //console.log('Service: in updateLikes, blog: ', blog)
    const response = await axios.put(`${baseUrl}/${id}`, blog, config)
    return response.data
}

// delete request to delete blog
const deleteBlog = async (id) => {
    //console.log('Service: in deleteBlog, id: ', id)
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, create, setToken, updateLikes, deleteBlog }
