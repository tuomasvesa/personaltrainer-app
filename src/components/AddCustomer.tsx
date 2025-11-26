
import { useState } from "react";
import type { CustomerForm } from "../types";
import saveCustomer from "../customerApi";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type AddCustomerProps = {
    fetchCustomers: () => void;
}

export default function AddCustomer({ fetchCustomers }: AddCustomerProps) {
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
        setOpen(true)
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

        saveCustomer(customer) // function defined in customerApi.ts
            .then(() => {
                fetchCustomers();
                handleClose();
            })
            .catch(err => console.error(err))
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new Customer</DialogTitle>
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
    );

}
