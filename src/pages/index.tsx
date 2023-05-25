import AppearanceSwitch from "@/components/part/appearance-switch"
import LanguageSwitch from "@/components/part/language-switch"
import {
	ConnectButton,
	ConnectKitProvider,
	createWagmiConfig,
	useIsConnected
} from "@crossbell/connect-kit"
import {
	NotificationModal,
	useShowNotificationModal
} from "@crossbell/notification"
import { CharacterAvatar } from "@crossbell/ui"
import { extractCharacterName } from "@crossbell/util-metadata"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { WagmiConfig } from "wagmi"

const queryClient = new QueryClient()
const wagmiConfig = createWagmiConfig({ appName: "Crossbell Dev" })

export function NotificationBtn() {
	const isConnected = useIsConnected()
	const show = useShowNotificationModal()

	if (!isConnected) return null

	return <button onClick={show}>Notifications</button>
}

export const Wallet = () => (
	<ConnectButton>
		{(status, { connect, selectCharacters }) => {
			if (status.isConnected) {
				const { character } = status.account
				const displayName =
					extractCharacterName(character) ?? status.displayAddress
				return (
					<button onClick={selectCharacters} className="flex gap-1">
						<CharacterAvatar size="24px" character={character} />
						{displayName}
					</button>
				)
			} else {
				return <button onClick={connect}>Connect</button>
			}
		}}
	</ConnectButton>
)

export default function App() {
	const { t } = useTranslation()

	return (
		<div className="flex flex-col gap-4 items-start font-mono text-size-lg p-2">
			<div
				className="flex flex-row gap-4 items-start w-full justify-between items-center"
				style={{ padding: "0 1rem 0 1rem" }}
			>
				<img
					className="hover: cursor-pointer"
					style={{ width: 64, height: 64 }}
					src={"/logo.png"}
					alt="Flare Dapp"
				/>
				<div className="hover: cursor-pointer">Home</div>
				<div>Search</div>
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
								<NotificationModal />
								<div className="flex flex-row gap-4">
									<NotificationBtn />
									<Wallet />
								</div>
							</ConnectKitProvider>
						</WagmiConfig>
					</QueryClientProvider>
				</div>
			</div>
			<div className="flex flex-col p-xy gap-4xl">
				<div>Create Post</div>
				<ul className="flex gap-8xl justify-start">
					<li>Best</li>
					<li>Hot</li>
					<li>New</li>
					<li>Top</li>
					<li>Rising</li>
				</ul>
				<div style={{ position: "fixed", bottom: 0, width: "100%" }}>
					LIVE DATA ACTIVE
				</div>
			</div>
		</div>
	)
}
