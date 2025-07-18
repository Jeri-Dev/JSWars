export const useTranformFileToBase64 = async (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			resolve(reader.result as string)
		}
		reader.onerror = reject
		reader.readAsDataURL(file)
	})
}
