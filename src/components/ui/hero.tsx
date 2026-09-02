import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Composant d'origine écrit pour Next.js + shadcn/ui. Trois adaptations pour ce
// site : pas de `next/link` (Astro sert du HTML, un <a> suffit), pas de
// <Button> shadcn (le site n'a ni components.json ni Radix, les boutons
// reprennent l'aspect de .latest-cta), et les jetons de thème shadcn
// (bg-background, bg-primary, text-muted-foreground) sont remplacés par la
// palette maison : sable #f5f3ee, encre #12304a, terracotta #d9826b.

const PAPER = "#f5f3ee";
const INK = "#12304a";
const WARM = "#d9826b";

export type HeroAction = {
	label: string;
	href: string;
	/** `default` = bouton plein encre, `outline` = contour encre. */
	variant?: "default" | "outline";
};

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
	title: React.ReactNode;
	subtitle?: React.ReactNode;
	actions?: HeroAction[];
	/** Halo conique animé derrière le titre. */
	gradient?: boolean;
	/** Voile flouté au-dessus du halo. */
	blur?: boolean;
	titleClassName?: string;
	subtitleClassName?: string;
	actionsClassName?: string;
}

const actionClasses = (variant: HeroAction["variant"]) =>
	variant === "outline"
		? "border border-[#12304a]/25 bg-white/70 text-[#12304a] hover:bg-white"
		: "bg-[#12304a] text-white hover:opacity-85";

const Hero = React.forwardRef<HTMLElement, HeroProps>(
	(
		{
			className,
			gradient = true,
			blur = true,
			title,
			subtitle,
			actions,
			titleClassName,
			subtitleClassName,
			actionsClassName,
			...props
		},
		ref,
	) => {
		return (
			<section
				ref={ref}
				className={cn(
					"relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden",
					className,
				)}
				style={{ background: PAPER }}
				{...props}
			>
				{gradient && (
					<div
						className="absolute top-[88px] isolate z-0 flex w-full flex-1 items-start justify-center"
						aria-hidden="true"
					>
						{blur && (
							<div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
						)}

						{/* Halo principal */}
						<div
							className="absolute inset-auto z-50 h-36 w-[28rem] translate-y-[10%] rounded-full opacity-70 blur-3xl"
							style={{ background: `${WARM}59` }}
						/>

						{/* Faisceau */}
						<motion.div
							initial={{ width: "8rem" }}
							viewport={{ once: true }}
							transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
							whileInView={{ width: "16rem" }}
							className="absolute top-0 z-30 h-36 -translate-y-[10%] rounded-full blur-2xl"
							style={{ background: `${WARM}4d` }}
						/>

						{/* Ligne de crête */}
						<motion.div
							initial={{ width: "15rem" }}
							viewport={{ once: true }}
							transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
							whileInView={{ width: "30rem" }}
							className="absolute inset-auto z-50 h-0.5"
							style={{ background: `${WARM}` }}
						/>

						{/* Cône gauche */}
						<motion.div
							initial={{ opacity: 0.5, width: "15rem" }}
							whileInView={{ opacity: 1, width: "30rem" }}
							transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
							style={{
								backgroundImage:
									"conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
							}}
							className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-[#d9826b]/35 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
						>
							<div
								className="absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]"
								style={{ background: PAPER }}
							/>
							<div
								className="absolute bottom-0 left-0 z-20 h-full w-40 [mask-image:linear-gradient(to_right,white,transparent)]"
								style={{ background: PAPER }}
							/>
						</motion.div>

						{/* Cône droit */}
						<motion.div
							initial={{ opacity: 0.5, width: "15rem" }}
							whileInView={{ opacity: 1, width: "30rem" }}
							transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
							style={{
								backgroundImage:
									"conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
							}}
							className="absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-[#d9826b]/35 [--conic-position:from_290deg_at_center_top]"
						>
							<div
								className="absolute bottom-0 right-0 z-20 h-full w-40 [mask-image:linear-gradient(to_left,white,transparent)]"
								style={{ background: PAPER }}
							/>
							<div
								className="absolute bottom-0 right-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]"
								style={{ background: PAPER }}
							/>
						</motion.div>
					</div>
				)}

				<motion.div
					initial={{ y: 100, opacity: 0.5 }}
					viewport={{ once: true }}
					transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
					whileInView={{ y: 0, opacity: 1 }}
					className="relative z-50 mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center gap-4 px-5 md:px-10"
				>
					<div className="flex flex-col items-center space-y-4 text-center">
						<h1
							className={cn(
								"font-[var(--display)] text-4xl font-bold tracking-tight text-[#12304a] sm:text-5xl md:text-6xl lg:text-7xl",
								titleClassName,
							)}
						>
							{title}
						</h1>
						{subtitle && (
							<p
								className={cn(
									"max-w-2xl text-lg leading-relaxed text-[#12304a]/70",
									subtitleClassName,
								)}
							>
								{subtitle}
							</p>
						)}
						{actions && actions.length > 0 && (
							<div className={cn("flex flex-wrap justify-center gap-4", actionsClassName)}>
								{actions.map((action) => {
									const external = /^https?:/.test(action.href);
									return (
										<a
											key={action.href + action.label}
											href={action.href}
											{...(external
												? { target: "_blank", rel: "noopener noreferrer" }
												: {})}
											className={cn(
												"inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium no-underline transition-opacity",
												actionClasses(action.variant),
											)}
										>
											{action.label}
										</a>
									);
								})}
							</div>
						)}
					</div>
				</motion.div>
			</section>
		);
	},
);
Hero.displayName = "Hero";

export { Hero };
