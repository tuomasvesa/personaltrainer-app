import { useState } from "react";
import type { Customer, TrainingForm } from "../types";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputAdornment, TextField } from "@mui/material";
import saveTraining from "../trainingApi";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type AddTrainingProps = {
    fetchCustomers: () => void;
    customerRow: Customer;

}

export default function AddTraining({ fetchCustomers, customerRow }: AddTrainingProps) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TrainingForm>({
        date: dayjs(),
        duration: 0,
        activity: "",
        customer: ""
    });

    // initializing date and time, to get them separately from user in Dialog window
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
        setTraining(
            {
                date: dayjs(),
                duration: 0,
                activity: "",
                customer: customerRow._links.self.href
            }
        )
    }

    const handleClose = () => {
        setOpen(false);
        setTraining(
            {
                date: dayjs(),
                duration: 0,
                activity: "",
                customer: ""
            }
        )
    }

    const handleSave = () => {
        if (!training.duration || !training.activity || !date || !time) {
            alert("Fill all the input fields!")
            return;
        }

        const parsedDate = date.hour(time.hour())
            .minute(time.minute())
            .second(0);

        const trainingtoSave = { ...training, date: parsedDate };
        saveTraining(trainingtoSave)
            .then(() => {
                fetchCustomers();
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add a Training
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add a New Training  for {customerRow.firstname} {customerRow.lastname}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            required
                            label="Activity"
                            value={training.activity}
                            onChange={event => setTraining({ ...training, activity: event.target.value })}
                            fullWidth
                            variant="standard"
                        />
                        <DatePicker
                            sx={{ mt: 2, width: '25ch' }}
                            label="Date"
                            value={date}
                            onChange={(value) => setDate(value)}
                        />
                        <TimePicker
                            sx={{ mt: 2, marginLeft: 2, width: '25ch' }}
                            label="Time"
                            ampm={false}
                            value={time}
                            onChange={(value) => setTime(value)}
                        />
                        <br/>
                        <FormControl variant="standard" sx={{mt: 2, width: '12ch' }}>
                            <Input
                                endAdornment={<InputAdornment position="end">minutes</InputAdornment>} // "end" means the text is in
                                aria-describedby="standard-weight-helper-text"                // the right side of the input field 
                                inputProps={{
                                    'aria-label': 'duration',
                                }}
                                required
                                value={training.duration}
                                onChange={event => setTraining({ ...training, duration: Number(event.target.value) })}
                            />
                            <FormHelperText id="standard-weight-helper-text">Duration</FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </>
    )

}