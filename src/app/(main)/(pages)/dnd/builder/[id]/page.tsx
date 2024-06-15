import { GetFormById } from "@/actions/form";
import FormBuilder from "../_components/form-builder";

export default async function Page({ params, }: {
    params:
    { id: string; };

}) {

    const form = await GetFormById(params.id);

    if (!form) {
        throw new Error("form not found");
    }

    console.log(form);

    return (
        <FormBuilder form={form} />
    );
}