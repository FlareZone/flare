import AppearanceSwitch from "@/components/part/appearance-switch"
import LanguageSwitch from "@/components/part/language-switch"
import { Card, CardTitle, SelectedCard } from "@/components/ui/card"
import { albumAtom, incAndDecAtom, photosStateAtom } from "@/state/demo"
import { useAtom } from "jotai"
import { Fragment, Suspense } from "react"
import { useTranslation } from "react-i18next"

function Controller() {
	const [id, setId] = useAtom(incAndDecAtom)
	return (
		<div className="flex items-center gap-2">
			{id > 1 && (
				<button onClick={() => setId("dec")}>
					<div className="i-carbon-arrow-left"></div>
				</button>
			)}
			<span>{id}</span>
			{id < 10 && (
				<button onClick={() => setId("inc")}>
					<div className="i-carbon-arrow-right"></div>
				</button>
			)}
		</div>
	)
}

function Photos() {
	const [photos] = useAtom(photosStateAtom)

	if (!photos.data) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl">
				{Array.from({ length: 9 }).map((_v, index) => {
					const uniqueId = `${index}`
					return (
						<Fragment key={uniqueId}>
							<Card id={uniqueId}>
								<CardTitle className="flex items-center gap-2">
									{"Loading... "}
									<div className="i-carbon-circle-dash animate-spin"></div>
								</CardTitle>
							</Card>
						</Fragment>
					)
				})}
			</div>
		)
	}

	const photoSet = photos.data
		.filter((photo, index) => {
			return (
				index ===
				photos.data.findIndex((obj) => {
					return obj.id === photo.id && obj.albumId === photo.albumId
				})
			)
		})
		.slice(0, 9)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl">
			{photoSet.map((photo, index) => {
				const uniqueId = `${index}`
				return (
					<Fragment key={uniqueId}>
						<Card id={uniqueId}>
							<CardTitle>{photo.title}</CardTitle>
						</Card>
						<SelectedCard id={uniqueId} className="w-80 h-60">
							<img
								src={photo.thumbnailUrl}
								alt={photo.title}
								className="w-full h-full object-cover"
							></img>
						</SelectedCard>
					</Fragment>
				)
			})}
		</div>
	)
}

function AlbumInfo() {
	const [album] = useAtom(albumAtom)
	return <h1>{album?.title}</h1>
}

export default function App() {
	const { t } = useTranslation()

	return (
		<div className="p-4 flex flex-col gap-4 items-center justify-center font-mono">
			<h1>{t("hello-world")}</h1>
			<Suspense fallback="loading...">
				<AlbumInfo />
			</Suspense>
			<Controller />
			<Photos />
			<div className="flex gap-4 items-center">
				<AppearanceSwitch />
				<LanguageSwitch />
			</div>
		</div>
	)
}
