"use client";

import React, { useState } from "react";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./designer-sidebar";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "./form-elements";

function Designer() {
    const [elements, setElements] = useState<FormElementInstance[]>([]);

    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    return (
        <div className="flex w-full h-full">
            <div className="p-4 w-full">
                <div
                    ref={droppable.setNodeRef}
                    className={cn(`bg-white dark:bg-black border-2 border-muted  max-w-[920px] mx-auto h-full rounded-xl
                flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto`,
                        droppable.isOver && "ring-2 ring-muted ring-inset")}>
                    {!droppable.isOver && (<p className="text-3xl font-bold flex flex-grow items-center">
                        Drop Here
                    </p>)}
                    {droppable.isOver && (<div className="p-4 w-full">
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    </div>)}
                </div>
            </div>
            <DesignerSidebar />
        </div>
    );
}

export default Designer;