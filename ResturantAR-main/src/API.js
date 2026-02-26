// const startURL = "https://resturantapi.somee.com/api/";
const startURL = "https://localhost:44386/api/";

export const getItems = async () => {
    const endpoint = startURL + "Items";
    const data = await (await fetch(endpoint)).json();
    return data;
}
export const getItemById = async (id) => {
    const endpoint = startURL + `Items?id=${id}`;
    const data = await (await fetch(endpoint)).json();
    return data;
}
export const SaveItem = async (obj) => {
    const endpoint = startURL + `Items`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    });
    return response.json();
}
export const SaveCustomer = async (obj) => {
    const endpoint = startURL + `Customers`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    });
    return response.json();
}
export const SaveReview = async (obj={}) => {
    const endpoint = startURL + `CustomerReviews`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    });
    return response.json();
}
export const getCustomers = async () => {
    const endpoint = startURL + `Customers`;
    const data = await (await fetch(endpoint)).json();
    console.log("asas");
    console.log(data);  
    return data;
}
export const getCustomerById = async (id) => {
    const endpoint = startURL + `Customers?id=${id}`;
    const data = await (await fetch(endpoint)).json();
    return data;
}
export const getReviews = async () => {
    const endpoint = startURL + `CustomerReviews`;
    const data = await (await fetch(endpoint)).json();
    return data;
}
export const getReviewById = async (id) => {
    const endpoint = startURL + `CustomerReviews?id=${id}`;
    const data = await (await fetch(endpoint)).json();
    return data;
}