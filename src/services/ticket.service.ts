import { Ticket } from "@prisma/client";
import { TicketService } from "./ticket.interface";
import { Repository } from "@/repositories/repository.interface";

export class TicketServiceImpl implements TicketService{

    private repository: Repository;

    constructor(repository: Repository){
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