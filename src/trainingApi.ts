

export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "/trainings") // url in .env file
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings" + response.statusText);

            return response.json();
        })
} 

export function getTrainingsWithCustomerInfo() {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings with customer info" + response.statusText);

            return response.json();
        })
} 