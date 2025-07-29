import { readTokenServer } from "@/shared/helpers/session"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
	const url = request.nextUrl.clone()
	const pathname = url.pathname
	const authUrl = new URL("/auth", url.origin)
	const isFile = pathname.includes(".")

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/auth") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/pages") ||
		isFile
	) {
		return NextResponse.next()
	}

	const { success, payload } = await readTokenServer()

	if (!success) {
		return NextResponse.redirect(authUrl)
	}

	const currentTime = Math.floor(Date.now() / 1000)

	if (payload.exp < currentTime) {
		return NextResponse.redirect(authUrl)
	}

	return NextResponse.next()
}
