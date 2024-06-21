"use client";

import React, { useState } from "react";
import SidebarBtnElement from "./sidebar-btn-element";
import { FormElements } from "./form-elements";

function DesignerSidebar() {

    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
        border-l-2 border-muted p-4 bg-white dark:bg-black overflow-y-auto h-full">
            <h1 className="text-2xl font-bold">Components</h1>
            <SidebarBtnElement formElement={FormElements.TextField} />
        </aside>
    );
}

export default DesignerSidebar;