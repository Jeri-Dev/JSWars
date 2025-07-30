import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
type CookieData = {
	name: string
	value: string
	days?: number
}
export async function POST(request: NextRequest) {
	try {
		const cookieData = await request.json()
		const cookieStore = await cookies()
		const cookiesArray: CookieData[] = Array.isArray(cookieData)
			? cookieData
			: [cookieData]
		for (const cookie of cookiesArray) {
			if (!cookie.name || cookie.value === undefined) {
				return NextResponse.json(
					{ error: "Nombre y valor son requeridos para cada cookie" },
					{ status: 400 },
				)
			}
		}
		for (const cookie of cookiesArray) {
			const { name, value, days } = cookie
			const cookieOptions: {
				name: string
				value: string
				expires?: Date
				httpOnly: boolean
				secure: boolean
				sameSite: "strict" | "lax" | "none"
			} = {
				name,
				value: String(value),
				sameSite: "strict",
				secure: true,
				httpOnly: true,
			}
			if (days !== undefined) {
				const expirationDate = new Date()
				expirationDate.setDate(expirationDate.getDate() + days)
				cookieOptions.expires = expirationDate
			}
			cookieStore.set(cookieOptions)
		}
		return NextResponse.json({
			success: true,
			message: "Cookies establecidas correctamente",
		})
	} catch (error) {
		console.error("Error al establecer cookies:", error)
		return NextResponse.json(
			{ error: "Error interno del servidor" },
			{ status: 500 },
		)
	}
}
