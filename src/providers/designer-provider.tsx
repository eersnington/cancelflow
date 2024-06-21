import { FormElementInstance, FormElementsType } from "@/app/(main)/(pages)/dnd/builder/_components/form-elements";
import { createContext } from "react";

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);


export default function DesignerContextProvider() {
    return (
        <div></div>
    );
}