import { Button } from "@/components/ui/button";
import { FormElement } from "./form-elements";


function SidebarBtnElement({
    formElement
}: {
    formElement: FormElement;
}) {
    const { label, icon } = formElement.designerBtnElement;
    return (
        <Button className="btn btn-secondary dark:hover:bg-[#2F006B] hover:bg-[#2F006B] dark:hover:text-white rounded-sm">
            {icon}
            <span className="ml-2">{label}</span>
        </Button>
    )
}

export default SidebarBtnElement;