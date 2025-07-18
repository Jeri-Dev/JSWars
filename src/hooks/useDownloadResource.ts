export const useDownloadResource = () => {
	const downloadFile = async (url: string, filename?: string) => {
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Cache-Control": "no-cache",
				},
			})

			if (!response.ok) {
				throw new Error(`Error al descargar: ${response.statusText}`)
			}

			const blob = await response.blob()

			const blobUrl = window.URL.createObjectURL(blob)

			const anchor = document.createElement("a")
			anchor.href = blobUrl
			anchor.download = filename || url.split("/").pop() || "downloaded_file"
			anchor.style.display = "none"

			document.body.appendChild(anchor)
			anchor.click()

			setTimeout(() => {
				document.body.removeChild(anchor)
				window.URL.revokeObjectURL(blobUrl)
			}, 100)

			return true
		} catch (error) {
			console.error("Error en la descarga:", error)
			return false
		}
	}

	return { downloadFile }
}
