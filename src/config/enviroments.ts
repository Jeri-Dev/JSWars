export const BASE_API_URL = String(
	process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api",
)

export const NEXT_PUBLIC_WS_BASE_URL = String(
	process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:5000",
)

export const CAPTCHA_PUBLIC_KEY = String(
	process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY,
)
export const APP_HOST = "http://localhost:5173"
