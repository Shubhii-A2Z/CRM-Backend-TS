export interface TicketService{
    get(id: string): Promise<any>;
    getAll(): Promise<any>;
    create(data: any): Promise<any>;
}