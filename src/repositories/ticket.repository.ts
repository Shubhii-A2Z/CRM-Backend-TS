import { Repository } from "./repository.interface";
import { Ticket } from "@prisma/client";
import { CreateTicketDTO } from "@/dtos/CreateTicketDTO";
import { prismaClient } from "@/prisma/client";

export class TicketRepository implements Repository{

    async create(data: CreateTicketDTO): Promise<Ticket> {
        const ticket=await prismaClient.ticket.create({
            data: {
                ...data
            }
        });
        return ticket;
    }

    async get(ticketId: string): Promise<Ticket | null> {
        const ticket=await prismaClient.ticket.findUnique({
            where:{
                id: ticketId
            }
        });
        return ticket;
    }

    async getAll(): Promise<Ticket[] | null> {
        const tickets=await prismaClient.ticket.findMany();
        return tickets;
    }

    async delete() {
        
    }

    async update() {
        
    }

    async getUserByEmail(_: string): Promise<any | null> {
        return null;
    }
        

}