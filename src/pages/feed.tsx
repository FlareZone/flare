/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BytesizeHeart, BytesizeRedHeart } from "@/pages"
import {
	useIsNoteLiked,
	useNoteLikeCount,
	useToggleLikeNote,
} from "@crossbell/connect-kit"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Character {
	note: any
	type: string
	characterId: number
	noteId: number
	owner: string
	createdAt: string
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

		return <div>{isLiked ? <BytesizeRedHeart /> : <BytesizeHeart />}</div>
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
					"https://indexer.crossbell.io/v1/characters/40943/feed/follow?type=LINK&type=POST_NOTE&type=POST_NOTE_FOR_ANY_URI&type=POST_NOTE_FOR_NOTE&limit=20"
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
					className="flex w-full py-3 px-3 border-b border-gray/20 bg-hover cursor-pointer flex-row gap-2xl items-start w-full"
					style={{ height: "8rem" }}
				>
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
							width: "100px",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{character.owner.length > 8 ? (
							<div
								className="w-full flex overflow-hidden"
								style={{ height: "36px" }}
							>
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
					<p className="overflow-hidden text-ellipsis markdown-renderer overflow-hidden transition-all-200 break-all max-h-500px">
						{character.note?.metadata?.content?.content.length < 120 ? (
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{character.note?.metadata?.content?.content}
							</ReactMarkdown>
						) : (
							`https://crossbell.io/notes/${character.characterId}-${character.noteId}`
						)}
					</p>
				</div>
			))}
		</div>
	)
}
