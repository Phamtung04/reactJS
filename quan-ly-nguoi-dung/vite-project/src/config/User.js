
import Api from './api'

const url = '/users'

const User = {
    getAll: () => Api.get(url),
    getById: (id) => Api.get(`${url}/${id}`),
    search: (query) => Api.get(`${url}?q=${query}`),
    limit: (limit) => Api.get(`${url}?_limit=${limit}`),
    cardByUserId: (id) => Api.get(`${url}/${id}/cards`),
    postByUserId: (id) => Api.post(`${url}/${id}/posts`),
    toDoByUserId: (id) => Api.get(`${url}/${id}/todos`),
    create: (body) => Api.post(`${url}/add`, body),
    upadteUser: (id, body) => Api.put(`${url}/${id}`, body),
    deleteUser: (id) => Api.delete(`${url}/${id}`),
}

export default User