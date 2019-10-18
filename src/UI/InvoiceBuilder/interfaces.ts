export interface CompanyData {
    name: string;
    address: string;
    zipcode: string;
    city: string;
    bankAcccount: string;
    coc: string;
    taxNumber: string;
}

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
