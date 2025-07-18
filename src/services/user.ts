import { API } from "@/config/api"

const { GET } = API

export const getUserProfileService = () => {
	const result = GET({
		url: "/users/me",
	})

	return result
}
