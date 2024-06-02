"use client"

import { ContainerScroll } from "../global/container-scroll-animation";
import { Button } from "../ui/button";

export default function HeroSection() {
    return (
        <section className="h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
            <div className="absolute inset-0 h-full w-full items-center px-5 py-24"></div>
            <div className="flex flex-col items-center text-center">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-black dark:text-white">
                                Stop
                                <span className="text-red-500 dark:red-400">{" losing "}</span>
                                customers <br />
                                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                    <span className="text-yellow-500 dark:yellow-400">with</span>
                                    <span className="text-blue-600 dark:text-blue-400"> smart</span>
                                    <span className="text-purple-600 dark:text-purple-400"> workflows</span>
                                </span>
                            </h1>
                            <p className="mt-4 mb-8 text-xl text-black">
                                Use cancellation workflows to <strong>keep your customers</strong> and understand why they leave.
                            </p>
                        </>
                    }
                />
            </div>
        </section>
    );
}
