import type { CustomerForm } from "./types";


export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "/customers") // url in .env file
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers: " + response.statusText);

            return response.json();
        })
}

export function deleteCustomer(url: string) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting customer: " + response.statusText);
            response.json();
        })
}

export default function saveCustomer(NewCustomer: CustomerForm) {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(NewCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new customer: " + response.statusText);
            return response.json();
        })
}