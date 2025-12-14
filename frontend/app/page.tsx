"use client"

import { HeroWithMockup } from "@/components/hero-with-mockup"
import { Features } from "@/components/features"
import { Brain, BrainCog } from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles-text";
import { BackgroundLines } from "@/components/ui/background-lines";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";


const features = [
    {
        id: 1,
        icon: BrainCog,
        title: "Before you build it, make sure it is worth building.",
        description:
            "A visual, feedback-first ideation tool that saves you from launching bad ideas in public.",
        image: "/hero.jpg",
    },
    {
        id: 2,
        icon: BrainCog,
        title: "Test your idea without giving away your secret sauce",
        description:
            "Stealth pitch parts of your idea, get smart feedback, and grow it without getting cloned.",
        image: "/hero.jpg",
    },
    {
        id: 3,
        icon: Brain,
        title: "Where ideas grow up — and get backed",
        description:
            "Visual ideation, flaw-finding AI, stealth pitching, and community funding. All in one space",
        image: "/hero.jpg",
    },
];

export default function Home() {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            router.push('/starting');
        }
    }, [user, isLoaded, router]);

    return (
        <div className="min-h-screen">
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 md:px-6">
                <HeroWithMockup
                    title="From Shower Thought to Funded Project."
                    description="Map your thoughts, stress-test them with AI, and pitch safely — all before writing a single line of code."
                    primaryCta={{
                        text: "Start Ideating",
                        onClick: () => router.push('/sign-in'),
                    }}
                    secondaryCta={{
                        text: "View us on GitHub",
                        href: "https://github.com/arkoroy05/supernote",
                    }}
                    mockupImage={{
                        alt: "AI Platform Dashboard",
                        width: 1248,
                        height: 765,
                        src: "/hero.jpg"
                    }}
                />
            </BackgroundLines>
            {/* <div className="flex flex-col gap-4">
                <MarqueeAnimation
                    direction="left"
                    baseVelocity={-1}
                    className="bg-green-500 text-white py-2"
                >
                    TEAM SUPERNOTE
                </MarqueeAnimation>
                <MarqueeAnimation
                    direction="right"
                    baseVelocity={-1}
                    className="bg-purple-500 text-white py-2"
                >
                    TEAM SUPERNOTE
                </MarqueeAnimation>
            </div> */}
            <Features
                progressGradientLight="bg-gradient-to-r from-sky-400 to-sky-500"
                progressGradientDark="bg-gradient-to-r from-sky-300 to-sky-400"
                features={features} />
            <div className="flex justify-center items-center min-h-[40vh] py-8">
                <SparklesText text="Supernote" className="text-4xl md:text-6xl lg:text-7xl" />
            </div>
        </div>
    )
}


