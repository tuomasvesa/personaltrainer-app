

export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "/customers") // url in .env file
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers" + response.statusText);

            return response.json();
        })
} 