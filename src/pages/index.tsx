import AppearanceSwitch from "@/components/part/appearance-switch"
import { Contract, providers } from "ethers";
import Web3Modal from "web3modal";
import LanguageSwitch from "@/components/part/language-switch"
import { ClaimBtn } from "@/pages/ClaimBtn"
import { CharacterList } from "@/pages/feed"
import {
	ConnectButton,
	ConnectKitProvider,
	createWagmiConfig,
	useAccountCharacter,
	useCsbDetailModal,
	useIsConnected,
	usePostNote
} from "@crossbell/connect-kit"
import { CharacterAvatar, SettingsMyCharacterIcon } from "@crossbell/ui"
import { extractCharacterName } from "@crossbell/util-metadata"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SVGProps, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { WagmiConfig } from "wagmi"

import Web3 from "web3"
import { AbiItem } from "web3-utils"
import contractABI from "./contractABI.json"

const web3 = new Web3("https://exchaintestrpc.okex.org")

const contractAddress = "0xce475A7b4A85B10530fc24AE13B1Dd00657A98ae"

const contract = new web3.eth.Contract(
	contractABI as AbiItem[],
	contractAddress
)

// contract object is ready to use
console.log("Get contract.methods success✅:", contract.methods)

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
				d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12Z"
			></path>
		</svg>
	)
}

export function BytesizeRedHeart(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			color="red"
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
				d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12Z"
			></path>
		</svg>
	)
}

function convertTimeToSeconds(timeString:any) {
  const regex = /(\d+)\s*(h|m|s)/g;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  let match = regex.exec(timeString);
  let seconds = 0;
  while (match != null) {
    const value = parseInt(match[1]);
    const unit = match[2];
    if (unit === 'h') {
      seconds += value * 60 * 60;
    } else if (unit === 'm') {
      seconds += value * 60;
    } else if (unit === 's') {
      seconds += value;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    match = regex.exec(timeString);
  }
  return seconds;
}

export default async function App() {
	const { t } = useTranslation()
	const TitleRef = useRef<HTMLInputElement>(null)
	const ValueRef = useRef<HTMLTextAreaElement>(null)

	const [title, setTitle] = useState("")
	const [value, setValue] = useState("")
	const [isChecked, setIsChecked] = useState(false)
	const [gambling, setGambling] = useState("")
	const [Duration, setDuration] = useState("")

	const character = useAccountCharacter()
	const web3ModalRef = useRef<Web3Modal>();

 const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const provider = await web3ModalRef.current?.connect();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 65) {
      window.alert("Change the network to OKEX");
      throw new Error("Change network to OKEX");
    }

    if (needSigner) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const signer = web3Provider.getSigner();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return signer;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return web3Provider;
  };

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const signer = await getProviderOrSigner(true);

	function NewPost({
		title,
		value,
		sources,
		externalUrls,
		tags,
		isChecked = false,
	}: {
		title: string
		value: string
		sources: string[]
		externalUrls: string[]
		tags: string[]
		isChecked?: boolean
	}) {
		const postNote = usePostNote()

		return (
			<button
				onClick={() => {
					console.log("isChecked:", isChecked)
					const newSources = isChecked ? [...sources, "gambling"] : sources
					postNote.mutate(
						{
							metadata: {
								title,
								content: value,
								sources: newSources,
								external_urls: externalUrls,
								tags,
							},
						},
						{
							onSuccess: () => {
								if (isChecked) {
									// Do cell contract
									// 判断Gambling, 开启对赌.
									if (gambling) {
										// 开启对赌, 调用对赌合约.
										console.log("Gambling value:", gambling)
										// 获取自己最新的帖子, 并对使用帖子的id发起对赌.
										const url = `https://indexer.crossbell.io/v1/notes?characterId=${
											character ? character.characterId : "40943"
										}&limit=20`
										// owner
										console.log('Get the account owner success✅:', character ? character.owner: "");
										void fetch(url)
											.then((response) => response.json())
											.then((data) => {
												// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
												console.log("characterId:", data.list[0].characterId, "noteId:", data.list[0].noteId)
												// characterId, noteId
												// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
												const postId = `${data.list[0].characterId}${data.list[0].noteId}`;
												const _isBet  = isChecked
												const _betAmount  = web3.utils.toWei(gambling, 'Gwei')
												const _duration = convertTimeToSeconds(Duration)
												// contract.methods
												// .publishPost(postId, _isBet, _betAmount, _duration)
												// .send({ from: `${character ? character.owner : "0x"}` })
												// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
												const SignerContract = new Contract(contractAddress,contractABI,signer);
												// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
												SignerContract.publishPost({
													postId, _isBet, _betAmount, _duration
												})
												// const txObject = {
												// 	from: `${character ? character.owner : "0x"}`,
												// 	to: contractAddress,
												// 	gas: 200000,
												// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
												// 	data: contract.methods.publishPost(postId, _isBet, _betAmount, _duration).encodeABI()
												// };
											})
									}
								}
							},
						}
					)
				}}
			>
				Do Post
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function RadioComponent() {
		const handleRadioClick = () => {
			setIsChecked(!isChecked)
		}

		return (
			<input
				type="radio"
				checked={isChecked}
				onClick={handleRadioClick}
				onChange={() => {}}
			/>
		)
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
					<div className="font-mono block pb-1 pl-2">Create Post</div>
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
							isChecked={isChecked}
						/>
						<IconParkOutlineArrowLeft onClick={handlePost} />
						<ClaimBtn />
						<CSBDetailBtn />
						<div className="flex gap-1 items-center">
							Gambling:
							<input
								value={gambling}
								onChange={(e) => setGambling(e.target.value)}
								className="font-mono block"
								placeholder="Value like 0.1"
								style={{
									height: "36px",
									width: "10rem",
									border: "1px solid #e5e7eb",
									backgroundColor: "#fff",
									borderRadius: "4px",
									color: "#1c1c1c",
									boxShadow: "none",
									outline: "none",
									padding: "0 1rem",
									fontSize: "14px",
								}}
							/>
							<input
								value={Duration}
								onChange={(e) => setDuration(e.target.value)}
								className="font-mono block"
								placeholder="Duration 1h"
								style={{
									height: "36px",
									width: "8rem",
									border: "1px solid #e5e7eb",
									backgroundColor: "#fff",
									borderRadius: "4px",
									color: "#1c1c1c",
									boxShadow: "none",
									outline: "none",
									padding: "0 1rem",
									fontSize: "14px",
								}}
							/>
							<RadioComponent />
						</div>
					</div>
				</div>
				<ul className="flex gap-8xl justify-start w-6xl pl-4">
					<div className="flex gap-xs">
						<li>Following</li> <BytesizeActivity />
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
