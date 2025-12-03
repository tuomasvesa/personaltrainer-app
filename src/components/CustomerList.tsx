import { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../customerApi";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type { Customer } from "../types";
import AddCustomer from "./AddCustomer";
import { Button } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import CsvDownloadButton from 'react-json-to-csv'

function CustomerList() {

    const fetchCustomers = () => {
        getCustomers()      // function defined in trainingApi.ts file
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const [customers, setCustomers] = useState<Customer[]>([])
    useEffect(() => {
        fetchCustomers();
    }, [])

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(url) // Function defined in customerApi.ts
                .then(() => fetchCustomers())
                .catch(err => console.error(err))
        }
    }

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First name" },
        { field: "lastname", headerName: "Last name", width: 120 },
        { field: "streetaddress", headerName: "Street address", width: 150 },
        { field: "postcode", headerName: "Post code", width: 85 },
        { field: "city", headerName: "City" },
        { field: "email", headerName: "Email", width: 160 },
        { field: "phone", headerName: "Phone", width: 110 },
        { // Delete customer -column
            headerName: "",
            width: 85,
            sortable: false,
            filterable: false,
            field: "_links.self.href",
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        },
        { // Edit customer -column
            headerName: "",
            width: 85,
            sortable: false,
            filterable: false,
            field: "links.customer.href",
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer fetchCustomers={fetchCustomers} customerRow={params.row} />
        },
        { // Add training -column
            headerName: "",
            width: 170,
            sortable: false,
            filterable: false,
            field: "links.self.href",
            renderCell: (params: GridRenderCellParams) =>
                <AddTraining fetchCustomers={fetchCustomers} customerRow={params.row} />
        }
    ]

    return (
        <>
            <div>
                <AddCustomer fetchCustomers={fetchCustomers} />    
            </div>
            <div>
                <CsvDownloadButton
                    data={customers}
                    filename={"customerData.csv"}
                    delimiter=","
                    style={{marginBottom: 10}}
                >
                    Download as CSV-file
                </CsvDownloadButton>
            </div>
            <div style={{ height: 500, margin: "auto" }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href} // id = self-link
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}

export default CustomerList;