import { STORAGES } from "@/config/constants"

export const readTokenServer = async () => {
	const { cookies } = await import("next/headers")

	const cookiesManager = await cookies()

	const token = cookiesManager.get(STORAGES.TOKEN)

	if (!token) {
		return {
			success: false,
			message: "Invalid token",
			token: "",
			payload: {},
			permissions: [],
			roleName: "",
		}
	}

	try {
		const parts = token.value?.split(".")
		if (parts.length !== 3) {
			throw new Error("Invalid token")
		}

		const header = JSON.parse(Buffer.from(parts[0], "base64url").toString())
		const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString())
		const permissions = cookiesManager.get(STORAGES.PERMISSIONS)
		const roleName = cookiesManager.get(STORAGES.ROLE_NAME)
		return {
			success: true,
			header,
			payload,
			token: token.value,
			permissions: permissions?.value ? JSON.parse(permissions.value) : [],
			roleName: roleName?.value ?? "Desconocido",
		}
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
			token: "",
			payload: {},
			permissions: [],
			roleName: "",
		}
	}
}

export const verifySession = async (
	{ notRedirect }: { notRedirect?: boolean } = { notRedirect: false },
) => {
	const { redirect } = await import("next/navigation")
	const { cookies } = await import("next/headers")

	const now = Math.floor(Date.now() / 1000)

	const { get, delete: delelteCookie } = await cookies()

	const token = get(STORAGES.TOKEN)
	const permissions = get(STORAGES.PERMISSIONS)
	const roleName = get(STORAGES.ROLE_NAME)

	if (!token) {
		return notRedirect ? null : redirect("/auth")
	}

	const { success, payload } = await readTokenServer()

	if (!success) {
		delelteCookie(STORAGES.TOKEN)
		return notRedirect ? null : redirect("/auth")
	}

	const { exp } = payload

	if (exp < now) {
		delelteCookie(STORAGES.TOKEN)
		return notRedirect ? null : redirect("/auth")
	}

	return {
		payload,
		token: token.value,
		permissions: permissions?.value ? JSON.parse(permissions.value) : [],
		roleName: roleName?.value ?? "Desconocido",
	}
}

export const redirectSession = async () => {
	const { cookies } = await import("next/headers")
	const { redirect } = await import("next/navigation")

	const now = Math.floor(Date.now() / 1000)

	const { get } = await cookies()

	const token = get(STORAGES.TOKEN)

	if (!token) {
		return
	}

	const { success, payload } = await readTokenServer()

	if (!success) {
		return
	}

	const { exp } = payload

	if (exp < now) {
		return
	}

	return redirect("/")
}
