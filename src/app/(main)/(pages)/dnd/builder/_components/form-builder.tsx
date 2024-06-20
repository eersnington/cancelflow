"use client";

import { Button } from "@/components/ui/button";
import { Workflows } from "@prisma/client";
import { ViewIcon, SaveIcon, BookCheckIcon } from "lucide-react";
import Designer from "./designer";
import { DndContext } from "@dnd-kit/core";


function FormBuilder({ form }: { form: Workflows }) {
    return (
        <DndContext>
            <main className="flex flex-col w-full h-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">Form:</span>
                        {form.name}
                    </h2>
                    <div className="flex gap-3">
                        <Button className="btn btn-primary dark:hover:bg-[#2F006B] hover:bg-[#2F006B] dark:hover:text-white rounded-sm"><ViewIcon className="mr-2" />Preview</Button>
                        <Button className="btn btn-primary bg-blue-500 hover:bg-blue-800 dark:hover:bg-blue-300 "><SaveIcon className="mr-2" />Save</Button>
                        <Button className="btn btn-secondary bg-green-500 hover:bg-green-700 dark:hover:bg-green-300"><BookCheckIcon className="mr-2" />Publish</Button>
                    </div>
                </nav>
                <div className="w-full h-screen dark:bg-gray-900 bg-gray-50 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
                    {/* Radial gradient for the container to give a faded look */}
                    {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    Backgrounds
                </p> */}
                    <Designer />
                </div>
            </main>
        </DndContext>
    );
}

export default FormBuilder;