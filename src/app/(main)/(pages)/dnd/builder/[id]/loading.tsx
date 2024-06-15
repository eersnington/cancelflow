import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <section className="flex items-center justify-center w-full">
            <Loader2 className="animate-spin w-10 h-10 text-primary-foreground" />
        </section>
    );
}