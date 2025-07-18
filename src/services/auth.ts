import { API } from "@/config/api"
import { IRegisterUser } from "@/contracts/services/auth"

const { POST } = API

export const registerUserService = (data: IRegisterUser) => {
	const result = POST({
		url: "/auth/register",
		data: data,
	})

	return result
}

export const loginUserService = (data: IRegisterUser) => {
	const result = POST({
		url: "/auth/login",
		data: data,
	})

	return result
}
