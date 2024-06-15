"use server";

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import { formSchemaType, formSchema } from "@/lib/types";


export async function CreateForm(data: formSchemaType) {

    const validation = formSchema.safeParse(data);

    if (!validation.success) {
        throw new Error("form not valid");
    }

    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser();
    if (!user) {
        throw new Error("user not found");
    }

    const { name, website } = data;

    const form = await db.workflows.create({
        data: {
            userId: user.id,
            description: website,
            shareUrl: "",
            name,
        },
    });

    if (!form) {
        throw new Error("something went wrong");
    }

    console.log("form created", form.id);

    return form.id;
}

export async function GetForms() {
    const user = await currentUser();
    if (!user) {
        throw new Error("user not found");
    }

    return await db.workflows.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}


export async function GetFormById(id: string) {
    const user = await currentUser();
    if (!user) {
        throw new Error("user not found");
    }

    return await db.workflows.findFirst({
        where: {
            id: id,
            userId: user.id,
        },
    });
}