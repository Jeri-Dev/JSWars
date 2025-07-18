export const decodeToken = (token: string) => {
	if (!token) return null
	if (typeof token !== "string") return null

	try {
		const [, payload] = token?.split(".")

		const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")

		const pad = base64.length % 4
		const paddedBase64 = pad ? base64 + "=".repeat(4 - pad) : base64

		const decodedPayload = atob(paddedBase64)
		const decodedPayloadUTF8 = decodeURIComponent(escape(decodedPayload))
		return JSON.parse(decodedPayloadUTF8)
	} catch (error) {
		console.error("Error reading token", error)
		return null
	}
}

export const useReadToken = (token: string) => {
	return decodeToken(token)
}
