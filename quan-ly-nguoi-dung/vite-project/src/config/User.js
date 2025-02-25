
import Api from './api'

const url = '/users'

const User = {
    getAll: () => Api.get(url),
    getById: (id) => Api.get(`${url}/${id}`),
    create: (body) => Api.post(url, body),
    updateUser: (id, body) => Api.put(`${url}/${id}`, body),
    deleteUser: (id) => Api.delete(`${url}/${id}`),
}

export default User;