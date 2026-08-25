export interface TicketRepository{
    create(data: any): Promise<any>;
    get(id: string): Promise<any | null>;
    getAllTickets(): Promise<any>;
    deleteTicket(): Promise<any>;
}