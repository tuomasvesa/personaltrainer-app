import { useEffect, useState } from "react";
import { getCustomers } from "../customerApi";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Customer } from "../types";


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

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First name"},
        { field: "lastname" , headerName: "Last name", width: 120 },
        { field: "streetaddress", headerName: "Street address", width: 150 },
        { field: "postcode" , headerName: "Post code" },
        { field: "city", headerName: "City" },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone", width: 120 }
    ]

    return (
        <>
            <div style={{ width: "100%", height: 500, margin: "auto" }}>
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