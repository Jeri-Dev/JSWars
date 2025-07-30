import { STORAGES } from "@/config/constants"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
	const manager = await cookies()
	manager.delete(STORAGES.TOKEN)
	manager.delete(STORAGES.ROLE_NAME)
	manager.delete(STORAGES.PERMISSIONS)
	return redirect("/auth")
}

export const POST = async () => {
	const { delete: deleteCookie } = await cookies()

	try {
		deleteCookie(STORAGES.TOKEN)
		deleteCookie(STORAGES.ROLE_NAME)
		deleteCookie(STORAGES.PERMISSIONS)

		return new NextResponse(
			JSON.stringify({
				message: "User logout successfully",
			}),
			{ status: 200 },
		)
	} catch {
		return new Response(
			JSON.stringify({
				messages: [
					{
						message: "Error logout",
					},
				],
			}),
			{ status: 400 },
		)
	}
}
