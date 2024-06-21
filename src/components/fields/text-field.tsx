"use client";

import { ElementsType, FormElement } from "@/app/(main)/(pages)/dnd/builder/_components/form-elements";
import { Text } from "lucide-react";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,
    constructor: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text Field",
            helperText: "This is a text field",
            placeholder: "Enter your text here",
            required: false,
        },
    }),
    designerBtnElement: {
        icon: Text,
        label: "Text Field",
    },
    designerComponent: () => <div>TextField</div>,
    formComponent: () => <div>TextField</div>,
    propertiesComponent: () => <div>TextField</div>,
};