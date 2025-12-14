import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Glow } from "@/components/ui/glow"
import { Github } from "lucide-react"

interface HeroWithMockupProps {
    title: string
    description: string
    primaryCta?: {
        text: string
        onClick: () => void
    }
    secondaryCta?: {
        text: string
        href: string
        icon?: React.ReactNode
    }
    mockupImage: {
        src: string
        alt: string
        width: number
        height: number
    }
    className?: string
}

export function HeroWithMockup({
    title,
    description,
    primaryCta = {
        text: "Get Started",
        onClick: () => { },
    },
    secondaryCta = {
        text: "GitHub",
        href: "https://github.com/your-repo",
        icon: <Github className="mr-2 h-4 w-4" />,
    },
    mockupImage,
    className,
}: HeroWithMockupProps) {
    return (
        <section
            className={cn(
                "relative text-foreground",
                "py-8 px-4 md:py-16 lg:py-20",
                "overflow-hidden",
                className,
            )}
        >
            <div className="relative mx-auto max-w-7xl flex flex-col gap-8 md:gap-12">
                <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 pt-4 md:pt-8 text-center">
                    {/* Heading */}
                    <h1
                        className={cn(
                            "inline-block animate-appear",
                            "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
                            "bg-clip-text text-transparent",
                            "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                            "leading-tight",
                            "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                            "max-w-5xl",
                        )}
                    >
                        {title}
                    </h1>

                    {/* Description */}
                    <p
                        className={cn(
                            "max-w-2xl animate-appear opacity-0 [animation-delay:150ms]",
                            "text-sm sm:text-base md:text-lg lg:text-xl",
                            "text-muted-foreground",
                            "font-normal",
                        )}
                    >
                        {description}
                    </p>

                    {/* CTAs */}
                    <div
                        className="relative z-10 flex flex-wrap justify-center gap-4 
            animate-appear opacity-0 [animation-delay:300ms]"
                    >
                        <Button
                            size="lg"
                            className={cn(
                                "bg-black hover:bg-emerald-600",
                                "text-white shadow-lg",
                                "transition-all duration-300",
                                "cursor-pointer",
                            )}
                            onClick={primaryCta.onClick}
                        >
                            {primaryCta.text}
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className={cn(
                                "bg-white hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900",
                                "text-black dark:text-white border-gray-300 dark:border-gray-700",
                                "hover:border-gray-400 dark:hover:border-gray-600",
                                "transition-all duration-300",
                                "cursor-pointer",
                            )}
                        >
                            <a href={secondaryCta.href} className="flex items-center">
                                {secondaryCta.icon}
                                {secondaryCta.text}
                            </a>
                        </Button>
                    </div>

                    
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Glow
                    variant="above"
                    className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
                />
            </div>
        </section>
    )
}
