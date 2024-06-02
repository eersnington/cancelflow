"use client"

import { ContainerScroll } from "../global/container-scroll-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
    const underlineVariants = {
        initial: { borderBottomColor: "black" },
        animate: {
            borderBottomColor: ["#FF0000", "#FFD700", "#1E90FF", "#800080"],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    const MotionText = ({ children }: { children: React.ReactNode }) => (
        <motion.span
            initial="initial"
            animate="animate"
            /* @ts-ignore */
            variants={underlineVariants}
            style={{
                borderBottom: "10px dotted",
                display: "inline-block",
                paddingBottom: "0.1rem",
            }}
        >
            {children}
        </motion.span>
    );

    return (
        <section className="h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
            <div className="absolute inset-0 h-full w-full items-center px-5 py-24"></div>
            <div className="flex flex-col items-center text-center">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-black dark:text-white">
                                Stop{" "}
                                <MotionText>losing</MotionText>{" "}
                                customers <br />
                                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                    <MotionText>with</MotionText>{" "}
                                    <MotionText>smart</MotionText>{" "}
                                    <MotionText>workflows</MotionText>
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
