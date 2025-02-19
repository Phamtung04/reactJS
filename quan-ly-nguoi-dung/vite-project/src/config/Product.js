import Api from './api'

const url = '/product'

const Product = {
    getAll: () => Api.get(url),
    getById: (id) => Api.get(`${url}/${id}`),
    search: (query) => Api.get(`${url}?q=${query}`),
    create: (body) => Api.post(url, body),
    updateProduct: (id, body) => Api.put(`${url}/${id}`, body),
    deleteProduct: (id) => Api.delete(`${url}/${id}`),
};

export default Product;