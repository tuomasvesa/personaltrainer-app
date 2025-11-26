import { useEffect, useState } from "react";
import { getTrainingsWithCustomerInfo } from "../trainingApi";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type TrainingWithCustomer } from "../types";
import dayjs from "dayjs";


function TrainingList() {

    const fetchTrainings = () => {
        getTrainingsWithCustomerInfo()      // function defined in trainingApi.ts file
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([])
    useEffect(() => {
        fetchTrainings();
    }, [])

    const columns: GridColDef[] = [
        {
            field: "date", width: 200,
            headerName: "Date and time",
            valueFormatter: (value: Date) => dayjs(value).format("DD.MM.YYYY HH:mm")
        },
        {
            field: "duration",
            headerName: "Duration"
        },
        {
            field: "activity", width: 120,
            headerName: "Activity"
        },
        {
            headerName: "Customer",
            field: "customer",
            width: 150,
            valueGetter: (value, row) => { // Using valueGetter to get Customer's full name
                return row.customer.firstName + " " + row.customer.lastName;
            }
        }
    ]

    return (
        <>
            <div style={{ width: "100%", height: 500, margin: "auto" }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={row => row.id}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}

export default TrainingList;