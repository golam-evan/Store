import http from "./httpService";

const apiEndpoint = 'https://localhost:44345/api/Customers';
//const apiEndpoint='https://store20190416023437.azurewebsites.net/api/Customers';

export function getCustomers(){
    return http.get(apiEndpoint)
}
export function deleteCustomer(customer) {
    http.delete(apiEndpoint + '/' + customer.id)
}
export function addCustomer(customer) {
    http.post(apiEndpoint,customer)
}
export function editCustomer(customer) {
    http.put(apiEndpoint+ '/' + customer.id,customer)
}
