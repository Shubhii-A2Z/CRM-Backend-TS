import { Ticket } from "@prisma/client";
import { CreateTicketDTO } from "@/dtos/CreateTicketDTO";
import { prismaClient } from "@/prisma/client";
import { TicketRepository } from "./ticket.repository.interface";

export class TicketRepositoryImpl implements TicketRepository {

    async create(data: CreateTicketDTO): Promise<Ticket> {
        const ticket = await prismaClient.ticket.create({
            data: {
                ...data
            }
        });
        return ticket;
    }

    async get(ticketId: string): Promise<Ticket | null> {
        const ticket = await prismaClient.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
        return ticket;
    }

    async getAllTickets(): Promise<Ticket[] | null> {
        const tickets = await prismaClient.ticket.findMany();
        return tickets;
    }

    async deleteTicket() {

    }

}