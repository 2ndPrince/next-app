import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}


export async function POST (request: NextRequest) {
    const requestBody = await request.json();
    const validation = schema.safeParse(requestBody);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const user = await prisma.user.findUnique({
        where: {
            email: requestBody.email
        }
    });

    if (user) return NextResponse.json({error: 'User already exists'}, {status: 400});
    const newUser = await prisma.user.create({
        data: {
            name: requestBody.name,
            email: requestBody.email
        }
    });
    return NextResponse.json(newUser, {status: 201});
}