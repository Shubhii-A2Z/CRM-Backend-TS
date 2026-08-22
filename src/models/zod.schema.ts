import {z} from 'zod';

// This is sample ZodSchema
export const createBookingSchema=z.object({
    userId: z.number({error: "UserId is mendatory"}),
    hotelId: z.number({error: "BookingId is mendatory"}),
    bookingAmount: z.number({error: "Booking Amount is mendatory"}).min(1,{error: "Booking amount should be greater than 1"}),
});

// Validate this schema using zodValidate middleware via:- validateRequestBody(createBookingSchema)

export const createUserSchema=z.object({
    name: z.string({error: "Name is mandatory"}),
    email: z.email({error: "Email is mandatory"}),
    password: z.string({error: "Password is mandatory"})
});

export const signInSchema=z.object({
    email: z.email({error: "Email is mandatory"}),
    password: z.string({error: "Password is mandatory"})
});