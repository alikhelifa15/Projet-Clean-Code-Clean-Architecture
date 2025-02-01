export interface ClientData {
    id?: string;
    dealerId?: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface ClientResponse {
    message: string;
    data?: ClientData;
    error?: string;
}

export interface Client {
    id: number;
    dealerId: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface GetClientsByDealerData {
    clientsByDealer: Client[];
}