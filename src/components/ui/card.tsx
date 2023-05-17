import * as React from "react"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { atom, useAtom } from "jotai"

const selectedIdAtom = atom<string | null>(null)

function Card({
	className,
	children,
	id,
}: {
	className?: string
	children: React.ReactNode
	id: string
}) {
	const [, setSelectedId] = useAtom(selectedIdAtom)
	return (
		<motion.button
			className={cn(
				"rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6",
				className
			)}
			layoutId={id}
			onClick={() => {
				setSelectedId(id)
			}}
		>
			{children}
		</motion.button>
	)
}

function SelectedCard({
	className,
	children,
	id,
}: {
	className?: string
	children: React.ReactNode
	id: string
}) {
	const [selectedId, setSelectedId] = useAtom(selectedIdAtom)
	return (
		<AnimatePresence>
			{selectedId && selectedId === id && (
				<motion.button
					className="fixed inset-0 z-10 flex items-center justify-center bg-black"
					onClick={() => setSelectedId(null)}
					initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
					animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
					exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
				>
					<motion.div
						layoutId={selectedId}
						className={cn(
							"rounded-lg overflow-clip border border-border bg-card text-card-foreground shadow-sm",
							className
						)}
					>
						{children}
					</motion.div>
				</motion.button>
			)}
		</AnimatePresence>
	)
}

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	>
		{props.children}
	</h3>
))
CardTitle.displayName = "CardTitle"

export { Card, SelectedCard, CardTitle }
