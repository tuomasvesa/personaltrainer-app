import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { TrainingDurationData, TrainingWithCustomer } from "../types";
import { useEffect, useState } from "react";
import { getTrainingsWithCustomerInfo } from "../trainingApi";
//import _ from 'lodash';
//import { groupBy } from "lodash";

export default function TrainingBarChart() {

    const [chartData, setChartData] = useState<TrainingDurationData[]>([]);

    useEffect(() => {
        getTrainingsWithCustomerInfo()
            .then((trainings: TrainingWithCustomer[]) => {
                const data = trainings.map(trng => ({ // mapping the trainings, to create chartData list
                    activity: trng.activity,
                    duration: trng.duration
                }),);
                setChartData(data);
            })
            .catch(err => console.error(err));
    }, [])

    // const groupedData = _.groupBy(chartData, "activity");


    return (
        <>
            <BarChart width={900} height={600} data={chartData}>
                <Bar dataKey="duration" fill="green" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="activity" />
                <YAxis label="Duration" />
            </BarChart>
        </>
    )
}