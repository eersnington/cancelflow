"use client"

import { CheckIcon } from "lucide-react";
import { motion } from 'framer-motion'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { pricingDetails } from "@/lib/constant";

export default function PricingPlan() {
    return (
        <section className="mt-4">
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: 'easeInOut',
                }}
                className="mt-20 mb-20 bg-gradient-to-br from-neutral-700 to-black py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
                Choose a plan that works for best you
                <p className="text-xl font-normal mt-4">
                    These plans are billed monthly. You can cancel anytime.
                </p>
            </motion.h1>
            <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-74 z-10">
                {pricingDetails.map((plan, index) => (
                    <Card key={index} className="inter-var p-6">
                        <CardHeader className="relative group/card w-full md:!w-[350px] h-auto rounded-xl">
                            <h1 className="text-xl font-bold text-black dark:text-white "
                            >
                                {plan.name}
                                <h2 className="text-6xl ">{plan.price}</h2>
                            </h1>
                        </CardHeader>
                        <CardContent className="text-slate-800 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            <ul className="my-4 flex flex-col gap-2">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckIcon className="text-green-700" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center items-center mt-8">
                            <button className="px-4 py-2 rounded-xl bg-green-700 dark:bg-white dark:text-black text-white text-base font-bold">
                                Get Started Now
                                <span className="ml-2">→</span>
                            </button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section >
    );
}
