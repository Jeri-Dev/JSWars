export type CookieData = {
	name: string
	value: string
	days?: number
}
/**
 * Establece una o varias cookies a través del endpoint API
 * @param cookies - Una cookie individual o un array de cookies para establecer
 * @returns Promise con la respuesta del servidor
 */
export async function setCookies(
	cookies: CookieData | CookieData[],
): Promise<{ success: boolean; message?: string; error?: string }> {
	try {
		const response = await fetch("/api/cookies", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cookies),
		})

		const result = await response.json()
		if (!response.ok) {
			throw new Error(result.error || "Error al establecer cookies")
		}
		return result
	} catch (error) {
		console.error("Error en la petición para establecer cookies:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Error desconocido",
		}
	}
}
