import { TextFieldFormElement } from "@/components/fields/text-field";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;

    constructor: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ReactElement;
        label: string;
    }

    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
};


export type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
}; 