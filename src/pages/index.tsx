import AppearanceSwitch from "@/components/part/appearance-switch"
import LanguageSwitch from "@/components/part/language-switch"
import { ClaimBtn } from "@/pages/ClaimBtn"
import { CharacterList } from "@/pages/feed"
import {
	ConnectButton,
	ConnectKitProvider,
	createWagmiConfig,
	useCsbDetailModal,
	useIsConnected,
	usePostNote,
} from "@crossbell/connect-kit"
import { CharacterAvatar, SettingsMyCharacterIcon } from "@crossbell/ui"
import { extractCharacterName } from "@crossbell/util-metadata"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SVGProps, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { WagmiConfig } from "wagmi"

const queryClient = new QueryClient()
const wagmiConfig = createWagmiConfig({ appName: "Crossbell Dev" })

export const Wallet = () => (
	<ConnectButton>
		{(status, { connect, selectCharacters }) => {
			if (status.isConnected) {
				const { character } = status.account
				const displayName =
					extractCharacterName(character) ?? status.displayAddress
				return (
					<button onClick={selectCharacters} className="flex gap-1 hidden">
						<CharacterAvatar size="24px" character={character} />
						<div
							className="font-mono"
							style={{
								width: "100px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{displayName.length > 8 ? (
								<div
									className="w-full flex overflow-hidden"
									style={{ height: "36px" }}
								>
									<span className="dark:block text-truncate">
										{displayName.slice(0, -4)}
									</span>
									<span className="dark:block" style={{ whiteSpace: "nowrap" }}>
										{displayName.slice(-4)}
									</span>
								</div>
							) : (
								displayName
							)}
						</div>
					</button>
				)
			} else {
				return <button onClick={connect}>Connect</button>
			}
		}}
	</ConnectButton>
)

export function CSBDetailBtn() {
	const isConnected = useIsConnected()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isActive, show, hide } = useCsbDetailModal()

	if (!isConnected) return null

	return (
		<SettingsMyCharacterIcon onClick={show}>CSB Detail</SettingsMyCharacterIcon>
	)
}

export function BytesizeActivity(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M4 16h7l3 13l4-26l3 13h7"
			></path>
		</svg>
	)
}

export function IconParkOutlineArrowLeft(props: any) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 48 48"
			{...props}
		>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
				d="M5.799 24h36m-24 12l-12-12l12-12"
			></path>
		</svg>
	)
}


export function BytesizeHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12Z"></path></svg>
  )
}

export function BytesizeRedHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" color="red" width="1em" height="1em" viewBox="0 0 32 32" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12Z"></path></svg>
  )
}

export default function App() {
	const { t } = useTranslation()
	const TitleRef = useRef<HTMLInputElement>(null)
	const ValueRef = useRef<HTMLTextAreaElement>(null)

	const [title, setTitle] = useState("")
	const [value, setValue] = useState("")

	function NewPost({
		title,
		value,
		...rest
	}: {
		title: string
		value: string
		[key: string]: any
	}) {
		const postNote = usePostNote()

		return (
			<button
				onClick={() => {
					postNote.mutate({
						metadata: {
							title,
							content: value,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							sources: rest.sources,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							external_urls: rest.externalUrls,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							tags: rest.tags,
						},
					})
				}}
			>
				New Post
			</button>
		)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handlePost() {
		console.log("HandlePost Create Post")
		if (TitleRef?.current) {
			// console.log(TitleRef?.current.value)
			// TitleRef.current.value = ""
		}
		if (ValueRef?.current) {
			// console.log(ValueRef?.current.value)
			// ValueRef.current.value = ""
		}
	}

	return (
		<div className="flex flex-col gap-4 items-start font-mono text-size-lg p-2">
			<div
				className="flex flex-row gap-4 items-start w-full justify-between items-center"
				style={{
					padding: "0 1rem 0 1rem",
					borderBottom: "1px solid #e5e7eb",
					backgroundColor: "transparent",
				}}
			>
				<img
					className="hover: cursor-pointer"
					style={{ width: 64, height: 64 }}
					src={"/logo.png"}
					alt="Flare Dapp"
				/>
				<div className="hover: cursor-pointer">Home</div>
				<div className="hover: cursor-pointer">Search</div>
				<div className="flex flex-row gap-4">
					<h1>{t("language")}</h1>
					<LanguageSwitch />
					<AppearanceSwitch />
				</div>
				<div>
					<a href="/dashboard" target={"_blank"}>
						Dashboard
					</a>
				</div>
				<div className="hover: cursor-pointer">
					<QueryClientProvider client={queryClient}>
						<WagmiConfig config={wagmiConfig}>
							<ConnectKitProvider>
								<div className="flex flex-row gap-4">
									<Wallet />
								</div>
							</ConnectKitProvider>
						</WagmiConfig>
					</QueryClientProvider>
				</div>
			</div>
			<div
				className="flex flex-col p-xy gap-4xl"
				style={{
					padding: "0 1rem 0 0",
					borderBottom: "1px solid #e5e7eb",
					backgroundColor: "transparent",
				}}
			>
				<div
					className="hover: cursor-pointer flex-col justify-between items-center gap-xs m-1"
					style={{
						height: "16rem",
						padding: "0 1rem 0 0",
						borderBottom: "1px solid #e5e7eb",
						backgroundColor: "transparent",
					}}
				>
					<div className="font-mono block pb-1">Create Post</div>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="font-mono block"
						placeholder="Title"
						ref={TitleRef}
						style={{
							height: "36px",
							width: "600px",
							border: "1px solid #e5e7eb",
							backgroundColor: "#fff",
							borderRadius: "4px",
							color: "#1c1c1c",
							boxShadow: "none",
							outline: "none",
							padding: "0 1rem",
							fontSize: "14px",
						}}
					></input>
					<br />
					<div className="flex flex-wrap gap-2 items-center">
						<textarea
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="font-mono block resize-none"
							name=""
							id=""
							placeholder="Text"
							ref={ValueRef}
							style={{
								height: "8rem",
								border: "1px solid #e5e7eb",
								backgroundColor: "#fff",
								borderRadius: "4px",
								color: "#1c1c1c",
								boxShadow: "none",
								outline: "none",
								padding: "0 1rem",
								fontSize: "14px",
							}}
						></textarea>
						<NewPost
							title={TitleRef?.current?.value || ""}
							value={ValueRef?.current?.value || ""}
							sources={["Flare"]}
							externalUrls={["https://crossbell.io"]}
							tags={["post"]}
						/>
						<IconParkOutlineArrowLeft onClick={handlePost} />
						<ClaimBtn />
						<CSBDetailBtn />
					</div>
				</div>
				<ul className="flex gap-8xl justify-start">
					<div className="flex gap-xs">
						<li>New</li> <BytesizeActivity />
					</div>
					<CharacterList />
				</ul>
				<div
					style={{
						position: "fixed",
						bottom: "0.5rem",
						width: "100%",
						padding: "0 1rem 0 0",
						borderBottom: "1px solid #e5e7eb",
						backgroundColor: "transparent",
					}}
				>
					LIVE DATA ACTIVE
				</div>
			</div>
		</div>
	)
}
