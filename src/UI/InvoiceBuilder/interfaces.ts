export interface PersonData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface ItemData {
    name: string;
    price: number;
    quantity: number;
    tax: number;
}

export interface ClientData {
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    zipcode: string;
    city: string;
}

export interface CompanyData {
    name: string;
    address: string;
    zipcode: string;
    city: string;
    email: string;
    phone: string;
    website: string;
    vatNumber: string;
    bankAccount: string;
    coc: string;
}
