
import React, { Suspense } from 'react'
import CreateFormBtn from './_components/create-form'
import FormSkeleton from './_components/form-skeleton'
import FormCard from './_components/form-card'
import { GetForms } from '@/actions/form'

type Props = {}

const Page = (props: Props) => {
    return (
        <div className="flex flex-col relative">
            <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
                Drag N Drop
            </h1>
            <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CreateFormBtn />
                <Suspense
                    fallback={[1, 2, 3].map((el) => (
                        <FormSkeleton key={el} />
                    ))}
                >
                    <FormCards />
                </Suspense>
            </div>
        </div>
    )
}

export default Page

async function FormCards() {
    const forms = await GetForms();
    return (
        <>
            {forms.map((form) => (
                <FormCard key={form.id} form={form} />
            ))}
        </>
    );
}
