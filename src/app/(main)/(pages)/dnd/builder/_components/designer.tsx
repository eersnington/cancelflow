"use client";

import React, { useState } from "react";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import DesignerSidebar from "./designer-sidebar";

function Designer() {

    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    return (
        <div className="flex w-full h-full">
            <div className="p-4 w-full">
                <div className="bg-white dark:bg-black border-2 border-muted  max-w-[920px] mx-auto h-full rounded-xl
                flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
                    <p className="text-3xl font-bold flex flex-grow items-center">
                        Drop Here
                    </p>
                </div>
            </div>
            <DesignerSidebar />
        </div>
    );
}

export default Designer;