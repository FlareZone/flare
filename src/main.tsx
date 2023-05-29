import "@unocss/reset/tailwind.css"
import "virtual:uno.css"
import "./styles/globals.css"

import "./i18n"

import { ConnectKitProvider, createWagmiConfig } from "@crossbell/connect-kit"

import { ipfsGateway, ipfsLinkToHttpLink } from "@/ipfs"
import { IpfsGatewayContext } from "@crossbell/ipfs-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiConfig } from "wagmi"

import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

const queryClient = new QueryClient()
const wagmiConfig = createWagmiConfig({ appName: "Crossbell App" })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<WagmiConfig config={wagmiConfig}>
				<ConnectKitProvider
					ipfsLinkToHttpLink={ipfsLinkToHttpLink}
					// Used for the case when we want to keep the user logged in even if the user disconnects from the wallet.
					// ConnectKit will make sure to reconnect to the wallet if the user initiates a transaction.
					// ignoreWalletDisconnectEvent={true}
				>
					<IpfsGatewayContext.Provider value={ipfsGateway}>
						<QueryClientProvider client={queryClient} contextSharing={true}>
							<App />
						</QueryClientProvider>
					</IpfsGatewayContext.Provider>
				</ConnectKitProvider>
			</WagmiConfig>
		</QueryClientProvider>
	</React.StrictMode>
)
