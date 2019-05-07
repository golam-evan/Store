import http from "./httpService";

const apiEndpoint = 'https://localhost:44345/api/Products'
//const apiEndpoint = 'https://store20190416023437.azurewebsites.net/api/Products';

export function getProducts() {
    return http.get(apiEndpoint)
}
export function deleteProduct(product) {
    http.delete(apiEndpoint + '/' + product.id)
}
export function addProduct(product) {
    http.post(apiEndpoint, product)
}
export function editProduct(product) {
    http.put(apiEndpoint + '/' + product.id, product)
}