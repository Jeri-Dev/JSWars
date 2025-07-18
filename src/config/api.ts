import { createClientHTTP } from "@/shared/helpers/clientHTTP"
import { BASE_API_URL } from "@/config/enviroments"
import { GLOBAL_TOKEN } from "@/config/constants"
import { GlobalErrorsAPI } from "@/contracts/API"

export const API = createClientHTTP<GlobalErrorsAPI>({
	baseUrl: BASE_API_URL,
	interceptors: {
		response(response) {
			return response
		},
	},
	headers: async () => {
		let token: string = ""

		if (typeof window !== "undefined") {
			token = (globalThis as any)[GLOBAL_TOKEN]
		} else {
			const { readTokenServer } = await import("@/shared/helpers/session")
			const result = await readTokenServer()

			token = result.token
		}

		return {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}
	},
})
