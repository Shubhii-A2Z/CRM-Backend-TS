import { Ticket } from "@prisma/client";
import { Service } from "./service.interface";
import { TicketRepository } from "@/repositories/ticket.repository";

export class TicketService implements Service{

    private repository: TicketRepository;

    constructor(repository: TicketRepository){
        this.repository=repository;
    }

    async create(data: any): Promise<Ticket> {
        return await this.repository.create(data);
    }

    async get(id: string): Promise<Ticket | null> {
        return await this.repository.get(id);
    }

    async getAll(): Promise<Ticket[] | null> {
        return await this.repository.getAll();
    }
    
}