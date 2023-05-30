/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useWeb2Url } from "@crossbell/ui"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BytesizeHeart, BytesizeRedHeart } from "@/pages"
import {
	useIsNoteLiked,
	useNoteLikeCount,
	useToggleLikeNote,
} from "@crossbell/connect-kit"
import { SVGProps, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Character {
	metadata: any
	note: any
	type: string
	characterId: number
	noteId: number
	owner: string
	createdAt: string
}

export function DeviconYunohost(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 128 128"
			{...props}
		>
			<g transform="translate(-173.29 -80.936) scale(3.77953)">
				<rect
					width="33.867"
					height="33.867"
					x="45.85"
					y="21.414"
					ry="2.646"
				></rect>
				<path
					fill="#fff"
					d="M50.23 51.691c-.296-.2-.695-.66-.887-1.023c-.37-.702-1.093-1.469-1.828-1.941c-.508-.326-.787-1.303-.478-1.675c.103-.124.539-.32.969-.436c.43-.115.853-.274.94-.352c.087-.079.166-.644.176-1.256c.059-3.748.088-3.84 1.235-3.84c1.36 0 2.28 1.625 1.833 3.237c-.317 1.143-.254 1.39.356 1.386c.932-.004.982-.111 1.024-2.166c.064-3.1.743-4.086 2.302-3.343c.988.472 1.134 1.75.458 4.025c-.222.744.217 3.825.676 4.755c.259.524-.018 1.26-.501 1.329c-.22.031-.58-.122-.877-.372c-.278-.234-.563-.425-.635-.425c-.071 0-.336-.297-.588-.66c-.438-.634-.94-.848-1.157-.496c-.056.09-.439.25-.85.353c-.722.182-.746.208-.655.703c.272 1.466.274 2.05.012 2.313c-.358.359-.876.32-1.524-.116zm16.74-2.294c-.358-.208-1.056-.985-1.365-1.52c-.11-.192-.204-.706-.207-1.144c-.008-1.17.483-1.907.738-1.105c.241.76 1.136 1.102 1.557.593c.34-.41-.229-1.368-1.639-2.76c-1.268-1.25-1.323-1.335-1.323-2.055c0-1.117.32-1.58 1.467-2.129c.954-.455 1.036-.468 1.71-.252c.915.294 1.99 1.33 1.916 1.846c-.045.323-.15.38-.714.38c-.364 0-.754.06-.868.133c-.337.219-.235.718.207 1.008c.407.266.413.264.413-.199c0-.454.043-.478 1.446-.788l1.445-.32l.118-1.3c.199-2.188.831-2.62 2.08-1.42c.381.367.705.757.719.867c.014.11.033.312.042.449c.013.204.265.238 1.441.19c1.372-.055 1.444-.04 1.94.413c.354.323.528.648.557 1.037c.036.478-.042.624-.508.942c-.302.207-1.288.612-2.189.9c-1.294.412-1.639.587-1.639.827c0 .168.085 1.048.188 1.957c.213 1.87.077 2.482-.62 2.8c-.614.28-.776.236-1.355-.362c-.678-.699-.888-1.436-.752-2.65c.125-1.123.052-1.208-.976-1.126l-.732.058l.24.687c.155.444.208 1.01.15 1.596c-.075.768-.174.982-.636 1.38c-1.369 1.177-2.155 1.47-2.85 1.067zm-6.73-.138c-.793-.137-1.945-1.028-2.639-2.042c-.495-.724-.551-.922-.54-1.9c.016-1.273.412-2.753.907-3.382c.392-.499 1.587-1.098 2.19-1.098c.366 0 1.213.311 2.508.922c1.118.526 1.312.854 1.558 2.623l.182 1.305l-.603 1.285c-.332.706-.77 1.441-.974 1.632c-.48.451-1.815.789-2.589.655zm.417-3.124c.594-.226.892-1.205.533-1.752c-.146-.224-.362-.407-.48-.407c-.658 0-1.354 1.562-.925 2.078c.23.277.33.287.872.08zm-9.325-8.313c-.316-.21-.743-.735-.975-1.198c-.376-.752-.409-.987-.368-2.625l.044-1.8l-.994-.954c-.547-.526-.995-.986-.995-1.022c0-.036-.149-.762-.33-1.612c-.182-.85-.331-1.94-.331-2.422c0-.754.058-.913.418-1.15c.654-.427 1.369-.14 2.005.806c.422.628.545 1.015.638 2.015c.123 1.304.34 1.673.884 1.5c.325-.102 1.267-1.08 1.603-1.662c.17-.295.21-.29.936.136c.549.321.813.607.952 1.027c.172.52.147.659-.229 1.3a6.195 6.195 0 0 1-1.046 1.267c-.344.302-.635.703-.645.89c-.08 1.402-.428 5.503-.482 5.67c-.1.305-.455.251-1.085-.166zm6.04-1.182c-.768-.335-1.823-1.635-2.06-2.537c-.25-.956-.234-4.899.023-5.923c.1-.4.269-.726.373-.726c.316 0 1.402.808 1.614 1.201c.118.217.213 1.176.232 2.333c.028 1.694.073 1.988.327 2.13c.224.126.348.093.516-.137c.122-.167.222-.419.223-.56c.002-.142.187-.837.413-1.545c.226-.707.419-1.637.428-2.065c.035-1.645.397-2.013 1.263-1.284c1.012.851 1.065 2.773.18 6.536c-.352 1.502-.705 2.016-1.74 2.541c-.634.32-1.116.33-1.793.036zm5.678-.351c-.882-.46-1.045-.793-.822-1.68c.495-1.968.591-4.307.26-6.31c-.106-.643-.075-.757.277-1.028c.218-.168.555-.307.748-.309c.468-.005 1.549 1.188 2.018 2.227c.685 1.52.934 1.953 1.081 1.885c.08-.037.165-1.184.189-2.548c.038-2.187.086-2.563.408-3.18c.2-.386.468-.7.593-.7c.126 0 .434.315.684.702c.25.386.524.75.607.81c.083.06.123.915.089 1.9a75.503 75.503 0 0 0-.04 3.196c.08 4.639.054 4.903-.502 5.114c-.527.2-1.358-.206-2.358-1.152c-.479-.452-.935-.822-1.015-.822c-.08 0-.278.427-.441.95c-.477 1.526-.568 1.574-1.776.945zm8.869-1.426c-1.54-.834-2.063-1.597-2.187-3.19c-.099-1.266.44-3.513 1.026-4.281c.23-.301.417-.63.417-.73c0-.101.33-.41.732-.687c.94-.646 1.81-.674 2.677-.086c1.216.825 1.393 1.463 1.444 5.2c.02 1.445-.016 1.633-.445 2.363c-.257.437-.632.856-.833.933c-.202.077-.458.249-.569.383c-.243.293-1.778.358-2.262.095zm1.638-3.994c.548-1.098.475-1.802-.197-1.898c-.298-.043-.428.085-.678.667c-.466 1.088-.577 1.756-.339 2.043c.355.427.715.186 1.214-.812z"
				></path>
			</g>
		</svg>
	)
}

export function Header(props: { metadata?: any }) {
  const { metadata } = props;
	let avatars = metadata?.character?.metadata?.content?.avatars[0] || [];
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	avatars = avatars.replace("ipfs://", "");

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const avatarUrl = `https://crossbell.io/ipfs/${avatars}`

  return (
    <img
	className="border-2 border-gray-300 rounded-full"
      src={avatarUrl}
      alt="Avatar"
      style={{ width: "48px", height: "48px" }}
    />
  );
}


export function CharacterList() {
	const [characters, setCharacters] = useState<Character[]>([])

	interface Props {
		noteId: number
		characterId: number
	}

	function NoteLikeCount({ noteId, characterId }: Props) {
		const { data: likeCount } = useNoteLikeCount({
			noteId: noteId,
			characterId: characterId,
		})
		return <div>{likeCount}</div>
	}

	function IsNoteLiked({ noteId, characterId }: Props) {
		const [{ isLiked }] = useIsNoteLiked({
			noteId: noteId,
			characterId: characterId,
		})

		return (
			<div>
				{isLiked ? (
					<BytesizeRedHeart className="cursor-not-allowed" />
				) : (
					<BytesizeHeart className="cursor-not-allowed" />
				)}
			</div>
		)
	}

	function DoLike({ noteId, characterId }: Props) {
		const note = { characterId: characterId, noteId: noteId }
		const [{ isLiked }] = useIsNoteLiked(note)
		const toggleLikeNote = useToggleLikeNote()

		return (
			<button
				onClick={() => {
					toggleLikeNote.mutate(note)
				}}
				disabled={toggleLikeNote.isLoading}
			>
				{isLiked ? "Unlike" : "Like"}
			</button>
		)
	}

	useEffect(() => {
		async function getCharacters() {
			try {
				const res = await fetch(
					`https://indexer.crossbell.io/v1/characters/40943/feed/follow?type=LINK&type=POST_NOTE&type=POST_NOTE_FOR_ANY_URI&type=POST_NOTE_FOR_NOTE&limit=20`
				)
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const data = await res.json()

				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				setCharacters(data.list)
			} catch (err) {
				console.log("Error fetching data:", err)
			}
		}
		getCharacters().catch(console.error)
	}, [])

	if (characters.length === 0) {
		return <div>Loading...</div>
	}

	return (
		<div className="container">
			{characters.map((character) => (
				<div
					key={character.noteId}
					className="flex py-6 border-b border-gray/20 cursor-pointer flex-row gap-xl items-start w-full items-center"
					style={{ height: "auto"}}
				>
					<Header metadata={character} />
					<IsNoteLiked
						noteId={character.noteId}
						characterId={character.characterId}
					/>
					<DoLike
						noteId={character.noteId}
						characterId={character.characterId}
					></DoLike>
					<NoteLikeCount
						noteId={character.noteId}
						characterId={character.characterId}
					/>
					{/* <p>Character ID: {character.characterId}</p> */}
					{/* <p>Note ID: {character.noteId}</p> */}
					<div
						className="font-mono"
						style={{
							width: "6rem",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{character.owner.length > 4 ? (
							<div className="flex overflow-hidden">
								<span className="dark:block text-truncate">
									{character.owner.slice(0, -4)}
								</span>
								<span className="dark:block" style={{ whiteSpace: "nowrap" }}>
									{character.owner.slice(-4)}
								</span>
							</div>
						) : (
							character.owner
						)}
					</div>
					<p className="overflow-hidden text-ellipsis markdown-renderer overflow-hidden transition-all-200 break-all max-h-500px w-auto">
						{character.note?.metadata?.content?.content.length < 160 ? (
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{character.note?.metadata?.content?.content}
							</ReactMarkdown>
						) : (
							<a
								href={`https://crossbell.io/notes/${character.characterId}-${character.noteId}`}
								target="_new"
							>
								https://crossbell.io/notes/{character.characterId}-
								{character.noteId}
							</a>
						)}
					</p>
				</div>
			))}
		</div>
	)
}
