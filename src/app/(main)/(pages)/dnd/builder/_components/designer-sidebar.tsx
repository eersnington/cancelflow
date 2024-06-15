"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

function DesignerSidebar() {

    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
        border-l-2 border-muted p-4 bg-black dark:bg-white overflow-y-auto h-full">
            <h1 className="text-2xl font-bold text-white dark:text-black">Components</h1>
        </aside>
    );
}

export default DesignerSidebar;