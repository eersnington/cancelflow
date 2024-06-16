"use client";

import { ElementsType, FormElement } from "@/app/(main)/(pages)/dnd/builder/_components/form-elements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,
    designerComponent: () => <div>TextField</div>,
    formComponent: () => <div>TextField</div>,
    propertiesComponent: () => <div>TextField</div>,
};