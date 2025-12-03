import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { Event, TrainingWithCustomer } from "../types";
import { useEffect, useState } from "react";
import { getTrainingsWithCustomerInfo } from "../trainingApi";

export default function Calendar() {

    const [events, setEvents] = useState<Event[]>([]);

    // To get a training's ending time, create function for adding duration to a starting time
    const addMinutesToDate = (date: Date, numOfMinutes: number) => {
        const d = new Date(date);
        d.setTime(d.getTime() + numOfMinutes * 60_000); // Added number is milliseconds by default, so it has to be multiplied
        return d;                                       // to convert it to minutes
    };

    useEffect(() => {
        getTrainingsWithCustomerInfo()
            .then((trainings: TrainingWithCustomer[]) => {
                const calendarEvents: Event[] = trainings.map(trng => ({ // mapping the trainings, to create list of calendar events
                    id: trng.id.toString(),
                    title: trng.activity + " - " + trng.customer.firstname + trng.customer.lastname,
                    start: (trng.date).toString(),
                    end: (addMinutesToDate(trng.date, trng.duration)).toString()

                }));
                setEvents(calendarEvents);
            })
            .catch(err => console.error(err))
    })

    return (
        <>
            <div style={{ maxWidth: "800px", margin: "20px auto" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    headerToolbar={{
                        start: "today prev next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={events}
                />
            </div>
        </>
    );

}



