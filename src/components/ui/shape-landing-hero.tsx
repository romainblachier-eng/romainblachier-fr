"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={`absolute ${className ?? ""}`}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} border border-[#12304a]/[0.12] shadow-[0_8px_32px_0_rgba(18,48,74,0.08)]`}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    description,
    ctaHref,
    ctaLabel,
    secondaryHref,
    secondaryLabel,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    ctaHref?: string;
    ctaLabel?: string;
    secondaryHref?: string;
    secondaryLabel?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <section className="hero-new relative min-h-[680px] w-full flex items-center overflow-hidden bg-[#f5f3ee]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#dce8ed]/70 via-transparent to-[#f4d8cf]/60 blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-[#7b9cac]/[0.18]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-[#d9826b]/[0.18]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-[#e0b35a]/[0.18]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-[#7b9cac]/[0.14]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-[#d9826b]/[0.14]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#12304a]/[0.12] mb-8 md:mb-10"
                    >
                        <Circle className="h-2 w-2 fill-rose-500/80" />
                        <span className="text-xs uppercase tracking-[0.18em] text-[#12304a]/70 font-semibold">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 md:mb-8 tracking-[-0.06em] leading-[0.9]">
                            <span className="text-[#12304a]">
                                {title1}
                            </span>
                            <br />
                            <span
                                className="text-[#d9826b]"
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    {description && (
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-base sm:text-lg md:text-xl text-[#12304a]/70 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                                {description}
                            </p>
                        </motion.div>
                    )}

                    {(ctaHref || secondaryHref) && (
                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap items-center justify-center gap-4"
                        >
                            {ctaHref && ctaLabel && (
                                <a
                                    href={ctaHref}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#12304a] text-white font-medium text-sm hover:bg-[#1d496b] transition-colors shadow-lg shadow-[#12304a]/15"
                                >
                                    {ctaLabel}<ArrowUpRight size={16} aria-hidden="true" />
                                </a>
                            )}
                            {secondaryHref && secondaryLabel && (
                                <a
                                    href={secondaryHref}
                                    className="inline-flex items-center px-6 py-3 rounded-full border border-[#12304a]/20 text-[#12304a]/75 font-medium text-sm hover:bg-white/60 transition-colors"
                                >
                                    {secondaryLabel}
                                </a>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ee]/70 via-transparent to-[#f5f3ee]/20 pointer-events-none" />
        </section>
    );
}

export { HeroGeometric };
