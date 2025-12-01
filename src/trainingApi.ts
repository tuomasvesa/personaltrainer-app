import type { TrainingForm } from "./types";

/*
export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "/trainings") // url in .env file
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings" + response.statusText);

            return response.json();
        })
}
*/

export function getTrainingsWithCustomerInfo() {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings with customer info" + response.statusText);

            return response.json();
        })
}

export default function saveTraining(NewTraining: TrainingForm) {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(NewTraining)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new training: " + response.statusText);
            return response.json();
        })
}

export function deleteTraining(id: number) {
    return fetch(import.meta.env.VITE_API_URL + "/trainings/" + id
        , {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting training: " + response.statusText);
            response.json();
        })
}

export function resetDatabase() {
    return fetch(import.meta.env.VITE_API_URL + "/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when resetting database: " + response.statusText);
            return response.json();
        })
}