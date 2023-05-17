import { useDark } from "@/hooks/index"

export default function AppearanceSwitch() {
	const [isDark, toggleDark] = useDark()

	return (
		<button
			className={isDark ? "i-carbon-moon" : "i-carbon-sun"}
			onClick={toggleDark}
		></button>
	)
}
