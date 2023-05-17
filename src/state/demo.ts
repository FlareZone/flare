import { Getter, atom } from "jotai"
import { atomsWithQuery } from "jotai-tanstack-query"
import originalKy from "ky"
import { Album, Photo } from "../type"

const ky = originalKy.extend({
	prefixUrl: "https://jsonplaceholder.typicode.com",
})

const idAtom = atom(1)

export const incAndDecAtom = atom(
	(get) => get(idAtom),
	(_get, set, action: "inc" | "dec") => {
		set(idAtom, (pre) => (action === "inc" ? pre + 1 : pre - 1))
	}
)

export const [albumAtom] = atomsWithQuery((get: Getter) => ({
	queryKey: ["users", get(idAtom)] as const,
	queryFn: async ({ queryKey: [, id] }) => {
		const res = await ky.get(`albums/${id}`)
		await new Promise((r) => setTimeout(r, 1000))
		return res.json<Album>()
	},
}))

export const [, photosStateAtom] = atomsWithQuery((get: Getter) => ({
	queryKey: ["photos", get(idAtom)] as const,
	queryFn: async ({ queryKey: [, id] }) => {
		const res = await ky.get(`albums/${id}/photos`)
		await new Promise((r) => setTimeout(r, 1000))
		return res.json<Photo[]>()
	},
}))
