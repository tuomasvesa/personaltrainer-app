import { useEffect, useState } from "react";
import { deleteTraining, getTrainingsWithCustomerInfo } from "../trainingApi";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { type TrainingWithCustomer } from "../types";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import CsvDownloadButton from 'react-json-to-csv';


function TrainingList() {



    const fetchTrainings = () => {
        getTrainingsWithCustomerInfo()      // function defined in trainingApi.ts file
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([])
    useEffect(() => {
        //resetDatabase();
        fetchTrainings();
    }, [])

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            deleteTraining(id)
                .then(() => fetchTrainings())
                .catch(err => console.error(err))
        }

    }

    const columns: GridColDef[] = [
        {
            field: "date", width: 150,
            headerName: "Date and time",
            valueFormatter: (value: Date) => dayjs(value).format("DD.MM.YYYY HH:mm")
        },
        {
            field: "duration", width: 110,
            headerName: "Duration (min)"
        },
        {
            field: "activity", width: 120,
            headerName: "Activity"
        },
        {
            headerName: "Customer",
            field: "customer",
            width: 150,
            valueGetter: (_value, row) => { // Using valueGetter to get Customer's full name
                return row.customer.firstname + " " + row.customer.lastname;
            }
        },
        {   // Delete training -column
            headerName: "",
            sortable: false,
            filterable: false,
            field: "_links.self.href",
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                    Delete
                </Button>

        }
    ]

    return (
        <>
            <div>
                <CsvDownloadButton
                    data={trainings}
                    filename={"trainingData.csv"}
                    delimiter=","
                    style={{ marginBottom: 10 }}
                >
                    Download as CSV-file
                </CsvDownloadButton>
            </div>
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