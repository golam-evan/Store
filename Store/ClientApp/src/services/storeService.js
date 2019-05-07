import http from "./httpService";

const apiEndpoint = 'https://localhost:44345/api/Stores';
//const apiEndpoint = 'https://store20190416023437.azurewebsites.net/api/Stores';

export function getStores() {
    return http.get(apiEndpoint)
}
export function deleteStore(store) {
    http.delete(apiEndpoint + '/' + store.id)
}
export function addStore(store) {
    http.post(apiEndpoint, store)
}
export function editStore(store) {
    http.put(apiEndpoint + '/' + store.id, store)
}
