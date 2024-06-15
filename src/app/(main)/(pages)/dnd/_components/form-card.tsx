"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Workflows } from "@prisma/client";
import { Edit, ArrowBigRightDash, LucideView, Inbox } from "lucide-react";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const FormCard = ({ form }: { form: Workflows }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{form.name}</span>
                    {form.publish && <Badge>Published</Badge>}
                    {!form.publish && <Badge variant={"destructive"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {form.publish && (
                        <span className="flex items-center gap-2">
                            <LucideView className="text-muted-foreground" />
                            <span>{form.visits.toLocaleString()}</span>
                            <Inbox className="text-muted-foreground" />
                            <span>{form.submissions.toLocaleString()}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter>
                {form.publish && (
                    <Button asChild className="w-full mt-2 text-md gap-4">
                        <Link href={`/dnd/forms/${form.id}`}>
                            View submissions <ArrowBigRightDash />
                        </Link>
                    </Button>
                )}
                {!form.publish && (
                    <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
                        <Link href={`/dnd/builder/${form.id}`}>
                            Edit form <Edit />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default FormCard;