import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import schema from "@/app/api/products/schema";


export async function GET (request: NextRequest) {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

export async function POST (request: NextRequest) {
    const body = await request.json();
    const validation = await schema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400});

    const product = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price
        }
    });

    return NextResponse.json(product, {status: 201});
}