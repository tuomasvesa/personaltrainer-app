import { useState } from "react";
import type { Customer, CustomerForm } from "../types";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type EditCustomerProps = {
    fetchCustomers: () => void;
    customerRow: Customer;
}

export default function EditCustomer({ fetchCustomers, customerRow }: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerForm>({
        firstname: "",
        lastname: "",
        streetaddress: "string",
        postcode: "string",
        city: "",
        email: "",
        phone: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: customerRow.firstname,
            lastname: customerRow.lastname,
            streetaddress: customerRow.streetaddress,
            postcode: customerRow.postcode,
            city: customerRow.city,
            email: customerRow.email,
            phone: customerRow.phone
        })
    }

    const handleClose = () => {
        setOpen(false);
        setCustomer(
            {
                firstname: "",
                lastname: "",
                streetaddress: "",
                postcode: "",
                city: "",
                email: "",
                phone: ""
            }
        )
    };

    const handleSave = () => {
        if (!customer.firstname || !customer.lastname || !customer.email) {
            alert("Enter name and email!");
            return;
        }

        fetch(customerRow._links.customer.href, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when editing customer");
                return response.json();
            })
            .then(() => {
                fetchCustomers();
                handleClose();

            })
            .catch(err => console.error(err))
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        required
                        label="First name"
                        value={customer.firstname}
                        onChange={event => setCustomer({ ...customer, firstname: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Last name"
                        value={customer.lastname}
                        onChange={event => setCustomer({ ...customer, lastname: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Street address"
                        value={customer.streetaddress}
                        onChange={event => setCustomer({ ...customer, streetaddress: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Post code"
                        value={customer.postcode}
                        onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="City"
                        value={customer.city}
                        onChange={event => setCustomer({ ...customer, city: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Email"
                        value={customer.email}
                        onChange={event => setCustomer({ ...customer, email: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Phone"
                        value={customer.phone}
                        onChange={event => setCustomer({ ...customer, phone: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}