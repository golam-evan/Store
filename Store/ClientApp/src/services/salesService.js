import http from "./httpService";

const apiEndpoint = 'https://localhost:44345/api/Sales';
//const apiEndpoint = 'https://store20190416023437.azurewebsites.net/api/Sales';

export function getSales() {
    return http.get(apiEndpoint)
}
export function deleteSale(sale) {
    http.delete(apiEndpoint + '/' + sale.id)
}
export function addSale(sale) {
    http.post(apiEndpoint, sale)
}
export function editSale(sale) {
    http.put(apiEndpoint + '/' + sale.id, sale)
}
