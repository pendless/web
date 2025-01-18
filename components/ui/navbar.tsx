"use client"

import { createContext, use, useCallback, useId, useMemo, useState } from "react"

import { cn } from "@/utils/classes"
import { useMediaQuery } from "@/utils/use-media-query"
import { IconHamburger } from "justd-icons"
import { LayoutGroup, motion } from "motion/react"
import type { LinkProps } from "react-aria-components"
import { Link, composeRenderProps } from "react-aria-components"
import { type VariantProps, tv } from "tailwind-variants"

import { Button, type ButtonProps } from "./button"
import { composeTailwindRenderProps } from "./primitive"
import { Sheet } from "./sheet"

type NavbarOptions = {
	side?: "left" | "right"
	isSticky?: boolean
	intent?: "navbar" | "floating" | "inset"
}

type NavbarContextProps = {
	open: boolean
	setOpen: (open: boolean) => void
	isCompact: boolean
	toggleNavbar: () => void
} & NavbarOptions

const NavbarContext = createContext<NavbarContextProps | null>(null)

function useNavbar() {
	const context = use(NavbarContext)
	if (!context) {
		throw new Error("useNavbar must be used within a Navbar.")
	}

	return context
}

interface NavbarProps extends React.ComponentProps<"header">, NavbarOptions {
	defaultOpen?: boolean
	isOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

const navbarStyles = tv({
	base: "@container relative isolate flex w-full flex-col",
	variants: {
		intent: {
			floating: "px-2.5 pt-2",
			navbar: "",
			inset: "min-h-svh bg-navbar dark:bg-bg",
		},
	},
})

const Navbar = ({
	children,
	isOpen: openProp,
	onOpenChange: setOpenProp,
	defaultOpen = false,
	className,
	side = "left",
	isSticky = false,
	intent = "navbar",
	...props
}: NavbarProps) => {
	const isCompact = useMediaQuery("(max-width: 765px)")
	const [_open, _setOpen] = useState(defaultOpen)
	const open = openProp ?? _open

	const setOpen = useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			if (setOpenProp) {
				return setOpenProp?.(typeof value === "function" ? value(open) : value)
			}

			_setOpen(value)
		},
		[setOpenProp, open],
	)

	const toggleNavbar = useCallback(() => {
		setOpen((open) => !open)
	}, [setOpen])

	const contextValue = useMemo<NavbarContextProps>(
		() => ({
			open,
			setOpen,
			isCompact,
			toggleNavbar,
			intent,
			isSticky,
			side,
		}),
		[open, setOpen, isCompact, toggleNavbar, intent, isSticky, side],
	)
	return (
		<NavbarContext value={contextValue}>
			<header data-navbar-intent={intent} className={navbarStyles({ intent, className })} {...props}>
				{children}
			</header>
		</NavbarContext>
	)
}

const navStyles = tv({
	base: [
		"group peer @md:flex hidden h-(--navbar-height) w-full items-center px-4 [--navbar-height:3.5rem]",
		"[&>div]:mx-auto @md:[&>div]:flex [&>div]:w-full [&>div]:max-w-[1680px] [&>div]:items-center",
	],
	variants: {
		isSticky: {
			true: "sticky top-0 z-40",
		},
		intent: {
			floating:
				"mx-auto w-full max-w-7xl rounded-xl border bg-navbar @md:px-4 text-navbar-fg 2xl:max-w-(--breakpoint-2xl)",
			navbar: "border-b bg-navbar @md:px-6 text-navbar-fg",
			inset: [
				"mx-auto @md:px-6",
				"[&>div]:mx-auto @md:[&>div]:flex [&>div]:w-full [&>div]:items-center 2xl:[&>div]:max-w-(--breakpoint-2xl)",
			],
		},
	},
})

interface NavbarNavProps extends React.ComponentProps<"div"> {
	intent?: "navbar" | "floating" | "inset"
	isSticky?: boolean
	side?: "left" | "right"
}

const NavbarNav = ({ className, ref, ...props }: NavbarNavProps) => {
	const { isCompact, side, intent, isSticky, open, setOpen } = useNavbar()

	if (isCompact) {
		return (
			<Sheet isOpen={open} onOpenChange={setOpen} {...props}>
				<Sheet.Content
					side={side}
					aria-label="Compact Navbar"
					data-navbar="compact"
					classNames={{
						content: "text-fg [&>button]:hidden",
					}}
					isFloat={intent === "floating"}
				>
					<Sheet.Body className="@md:px-4 px-2">{props.children}</Sheet.Body>
				</Sheet.Content>
			</Sheet>
		)
	}

	return (
		<div data-navbar-nav="true" ref={ref} className={navStyles({ isSticky, intent, className })} {...props}>
			<div>{props.children}</div>
		</div>
	)
}

interface NavbarTriggerProps extends ButtonProps {
	ref?: React.RefObject<HTMLButtonElement>
}
const NavbarTrigger = ({ className, onPress, ref, ...props }: NavbarTriggerProps) => {
	const { toggleNavbar } = useNavbar()
	return (
		<Button
			ref={ref}
			data-navbar-trigger="true"
			appearance="plain"
			aria-label={props["aria-label"] || "Toggle Navbar"}
			size="square-petite"
			className={className}
			onPress={(event) => {
				onPress?.(event)
				toggleNavbar()
			}}
			{...props}
		>
			<IconHamburger />
			<span className="sr-only">Toggle Navbar</span>
		</Button>
	)
}

const Section = ({ className, ...props }: React.ComponentProps<"div">) => {
	const { isCompact } = useNavbar()
	const id = useId()
	return (
		<LayoutGroup id={id}>
			<div
				data-navbar-section="true"
				className={cn("flex", isCompact ? "flex-col gap-y-4" : "flex-row items-center gap-x-3", className)}
				{...props}
			>
				{props.children}
			</div>
		</LayoutGroup>
	)
}

const navItemStyles = tv({
	base: [
		"*:data-[slot=icon]:-mx-0.5 relative flex cursor-pointer items-center gap-x-2 px-2 @md:text-sm text-muted-fg no-underline outline-hidden transition-colors forced-colors:transform-none forced-colors:outline-0 forced-colors:data-disabled:text-[GrayText]",
		"data-focused:text-fg data-hovered:text-fg data-pressed:text-fg data-focus-visible:outline-1 data-focus-visible:outline-primary",
		"**:data-[slot=chevron]:size-4 **:data-[slot=chevron]:transition-transform",
		"data-pressed:**:data-[slot=chevron]:rotate-180 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0",
		"data-disabled:cursor-default data-disabled:opacity-50 data-disabled:forced-colors:text-[GrayText]",
	],
	variants: {
		isCurrent: {
			true: "cursor-default text-navbar-fg",
		},
	},
})

interface NavbarItemProps extends LinkProps {
	isCurrent?: boolean
}

const Item = ({ className, isCurrent, ...props }: NavbarItemProps) => {
	const { intent, isCompact } = useNavbar()
	return (
		<Link
			data-navbar-item="true"
			aria-current={isCurrent ? "page" : undefined}
			className={composeRenderProps(className, (className, ...renderProps) =>
				navItemStyles({ ...renderProps, isCurrent, className }),
			)}
			{...props}
		>
			{(values) => (
				<>
					{typeof props.children === "function" ? props.children(values) : props.children}

					{(isCurrent || values.isCurrent) && !isCompact && intent !== "floating" && (
						<motion.span
							layoutId="current-indicator"
							className="absolute inset-x-2 bottom-[calc(var(--navbar-height)*-0.33)] h-0.5 rounded-full bg-fg"
						/>
					)}
				</>
			)}
		</Link>
	)
}

const Logo = ({ className, ...props }: LinkProps) => {
	return (
		<Link
			className={composeTailwindRenderProps(
				className,
				"relative @md:mr-4 flex items-center gap-x-2 @md:px-0 px-2 @md:py-0 py-4 text-fg data-focus-visible:outline-1 data-focus-visible:outline-primary data-focused:outline-hidden",
			)}
			{...props}
		/>
	)
}

const Flex = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
	return <div ref={ref} className={cn("flex items-center @md:gap-3 gap-2", className)} {...props} />
}

const compactStyles = tv({
	base: "flex @md:hidden justify-between bg-navbar text-navbar-fg peer-has-[[data-navbar-intent=floating]]:border",
	variants: {
		intent: {
			floating: "h-12 rounded-lg border px-3.5",
			inset: "h-14 border-b px-4",
			navbar: "h-14 border-b px-4",
		},
	},
})

interface NavbarCompactProps extends React.ComponentProps<"div">, VariantProps<typeof compactStyles> {
	ref?: React.RefObject<HTMLDivElement>
}
const NavbarCompact = ({ className, ref, ...props }: NavbarCompactProps) => {
	const { intent } = useNavbar()
	return <div ref={ref} className={compactStyles({ intent, className })} {...props} />
}

const insetStyles = tv({
	base: "grow",
	variants: {
		intent: {
			floating: "",
			inset: "@md:rounded-lg bg-bg @md:shadow-xs @md:ring-1 @md:ring-fg/15 dark:bg-navbar @md:dark:ring-border",
			navbar: "",
		},
	},
})

const Inset = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
	const { intent } = useNavbar()
	return (
		<main
			ref={ref}
			data-navbar-intent={intent}
			className={cn(
				"flex flex-1 flex-col",
				intent === "inset" && "bg-navbar @md:px-2 pb-2 dark:bg-bg",
				className,
			)}
		>
			<div className={insetStyles({ intent, className })}>{props.children}</div>
		</main>
	)
}

Navbar.Nav = NavbarNav
Navbar.Inset = Inset
Navbar.Compact = NavbarCompact
Navbar.Flex = Flex
Navbar.Trigger = NavbarTrigger
Navbar.Logo = Logo
Navbar.Item = Item
Navbar.Section = Section

export type { NavbarProps, NavbarNavProps, NavbarCompactProps, NavbarTriggerProps, NavbarItemProps }
export { Navbar }
