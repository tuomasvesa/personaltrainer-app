export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        }
    }
}

// export type CustomerForm = Omit<Customer, "_links">;

export type CustomerForm = {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type Training = {
    date: Date;
    duration: number;
    activity: string;
    _links: {
        self: {
            href: string
        },
        training: {
            href: string
        },
        customer: {
            href: string;
        }
    }

}

export type TrainingWithCustomer = {
    id: number;
    date: Date;
    duration: number;
    activity: string;
    customer: CustomerForm;   
}