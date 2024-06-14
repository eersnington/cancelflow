import { db } from "@/lib/db";
import { formSchemaType, formSchema } from "@/lib/types";
import { currentUser } from "@clerk/nextjs";


export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("form not valid");
    }

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

    return form.id;
}
