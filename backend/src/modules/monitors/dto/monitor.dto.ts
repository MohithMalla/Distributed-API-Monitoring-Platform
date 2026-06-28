import { z } from "zod";

export const createMonitorSchema = z.object({

    name: z.string().min(3),

    url: z.string().url(),

    method: z.enum([
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ]),

    intervalSeconds: z.number().min(30),

    timeout: z.number().default(5000),

    expectedStatus: z.number().default(200),

    headers: z.any().optional(),

    body: z.any().optional(),

    expectedResponse: z.string().optional(),

    sslMonitoring: z.boolean().default(false)

});