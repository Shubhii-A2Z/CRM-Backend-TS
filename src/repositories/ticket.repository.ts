import { Repository } from "./repository.interface";
import { Ticket } from "@prisma/client";
import { CreateTicketDTO } from "@/dtos/CreateTicketDTO";

export class TicketRepository implements Repository{
    async create(data: CreateTicketDTO): Promise<Ticket> {
        
    }

    async get() {
        
    }

    async getAll() {
        
    }

    async delete() {
        
    }

    async update() {
        
    }

}