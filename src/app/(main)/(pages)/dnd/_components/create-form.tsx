"use client";
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import { Loader2, PlusIcon } from 'lucide-react';
import { formSchema, formSchemaType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { CreateForm } from '@/actions/form';

export default function CreateFormBtn() {
    const router = useRouter();

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: formSchemaType) {
        console.log("submitted form")
        try {
            const formId = await CreateForm(values);
            console.log("form created", formId)
            toast({
                title: "Success",
                description: "Form created successfully",
                variant: "success",
            });
            router.push(`/builder/${formId}`);
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                >
                    <PlusIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                    <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create new form</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create form</DialogTitle>
                    <DialogDescription>Create a new form to start collecting responses</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website Link</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
                        {!form.formState.isSubmitting && <span>Save</span>}
                        {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}