export function capitalizeFirstLetter(text: string) {
	return text?.charAt(0)?.toUpperCase() + text?.slice(1)
}

export function formatPhone(phone: string) {
	if (phone.startsWith("1") && phone.length === 11) {
		return phone.replace(/(\d)(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4")
	}

	return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
}

export const formatNumberPrice = (value: number, noDecimals = false) => {
	if (typeof value !== "number") {
		throw new Error("formatNumber: value must be a number")
	}

	if (noDecimals) {
		return value.toLocaleString("en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		})
	}

	return value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

export const formatShortName = (name: string) => {
	const [firstName, lastName] = name?.split(" ")

	const nameFormat = `${firstName} ${lastName ?? ""}`

	if (nameFormat.length > 30) {
		return `${nameFormat.slice(0, 30)}...`
	}

	return nameFormat
}

export const formatShortPrice = (price: number) => {
	const units = [
		{ value: 1e12, symbol: "T" },
		{ value: 1e9, symbol: "B" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e3, symbol: "K" },
	]

	if (price < 1000) {
		return price.toLocaleString("en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		})
	}

	for (const unit of units) {
		if (price >= unit.value) {
			const formattedValue = (price / unit.value).toFixed(1)
			const finalValue = formattedValue.endsWith(".0")
				? formattedValue.slice(0, -2)
				: formattedValue
			return finalValue + unit.symbol
		}
	}

	return Math.round(price).toString()
}

export const formatRNC = (rnc: string): string => {
	if (!rnc) return ""

	const cleanRNC = rnc.replace(/\D/g, "")

	if (cleanRNC.length !== 11) return rnc

	return cleanRNC.replace(/(\d{3})(\d{5})(\d{1})/, "$1-$2-$3")
}

export const formatDominicanDocument = (cedula: string) => {
	if (!cedula) return ""

	if (cedula.length !== 11) return cedula

	const regex = /(\d{3})(\d{7})(\d{1})/
	const formattedCedula = cedula.replace(regex, "$1-$2-$3")

	return formattedCedula
}

export const formatFileSize = (size: number): string => {
	if (size < 1024) return `${size} B`
	const kb = size / 1024
	if (kb < 1024) return `${kb.toFixed(1)} KB`
	const mb = kb / 1024
	return `${mb.toFixed(1)} MB`
}

export const detectCardType = (number: string) => {
	const firstTwoDigits = number.substring(0, 2)
	const firstFourDigits = number.substring(0, 4)
	const firstSixDigits = number.substring(0, 6)
	const firstDigit = number.charAt(0)

	if (firstDigit === "4") {
		return "VISA"
	}

	if (
		(parseInt(firstTwoDigits) >= 51 && parseInt(firstTwoDigits) <= 55) ||
		(parseInt(firstFourDigits) >= 2221 && parseInt(firstFourDigits) <= 2720)
	) {
		return "MASTERCARD"
	}

	if (firstTwoDigits === "34" || firstTwoDigits === "37") {
		return "AMEX"
	}

	if (
		firstFourDigits === "6011" ||
		(parseInt(firstSixDigits) >= 622126 &&
			parseInt(firstSixDigits) <= 622925) ||
		(parseInt(firstTwoDigits) >= 64 && parseInt(firstTwoDigits) <= 65)
	) {
		return "DISCOVER"
	}

	return "DEFAULT"
}

export const formatCardNumber = (value: string) => {
	const cleanValue = value.replace(/\D/g, "")
	let formattedValue = ""

	const cardType = detectCardType(cleanValue)

	if (cardType === "AMEX") {
		for (let i = 0; i < cleanValue.length; i++) {
			if (i === 4 || i === 10) {
				formattedValue += " "
			}
			formattedValue += cleanValue[i]
		}
	} else {
		for (let i = 0; i < cleanValue.length; i++) {
			if (i > 0 && i % 4 === 0) {
				formattedValue += " "
			}
			formattedValue += cleanValue[i]
		}
	}

	return formattedValue
}

export const isValidCardNumber = (value: string) => {
	const cleanValue = value.replace(/\D/g, "")

	if (cleanValue.length < 13 || cleanValue.length > 19) {
		return false
	}

	let sum = 0

	let alternate = false

	for (let i = cleanValue.length - 1; i >= 0; i--) {
		let n = parseInt(cleanValue.charAt(i), 10)

		if (alternate) {
			n *= 2
			if (n > 9) {
				n -= 9
			}
		}

		sum += n
		alternate = !alternate
	}

	return sum % 10 === 0
}

export const isValidCVV = (value: string) => {
	const cleanValue = value.replace(/\D/g, "")

	if (cleanValue.length < 3 || cleanValue.length > 4) {
		return false
	}

	return true
}
