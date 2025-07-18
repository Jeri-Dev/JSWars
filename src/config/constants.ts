import { APP_HOST } from "./enviroments"

export const REDIRECT_TIMEOUT = 3000
export const SCIENTIFIC_NOTATION_ELEMENTS = ["e", "E", "+", "-"]
export const REGEX_CONTAINS_SCIENCE_NOTATION = /e|E|\+|-/
export const FORM_ACTION_TIMEOUT = 3000
export const DOCUMENT_REGEX_WHITE_LINES = /^\d{3}-\d{7}-\d{1}$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PHONE_MASK_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/
export const PHONE_LOCATIONS = ["829", "849", "809"]

export const GENERAL_INTEGRATION_ERROR_MESSAGE =
	"Ha ocurrido un error inesperado, por favor intenta de nuevo"

export const JWT_ALGORITHM = "HS256"
export const TOKEN_DESTINATION = {
	AUTH: "AUTH",
	VERIFICATION: "VERIFICATION",
} as const

export const STORAGES = {
	TOKEN: "token",
	ADMIN_KEY: "admin",
	ROLE_NAME: "role_name",
	PERMISSIONS: "permissions",
	EMAIL_REMEMBER: "email_remember",
}

export const GLOBAL_TOKEN = Symbol("globalToken")
export const GLOBAL_ROLE_NAME = Symbol("globalRoleName")
export const GLOBAL_PERMISSIONS = Symbol("globalPermissions")
export const TIME_SESSION = 30 * 24 * 60 * 60 * 1000
export const TIME_VERIFICATION_TOKEN = 2 * 60 * 60 * 1000

export const VALIDITY_ERROR_MESSAGE: Record<keyof ValidityState, string> = {
	badInput: "El valor ingresado no es válido",
	customError: "El valor ingresado no es válido",
	patternMismatch: "El valor ingresado no es válido",
	rangeOverflow: "El valor ingresado es demasiado grande",
	rangeUnderflow: "El valor ingresado es demasiado pequeño",
	stepMismatch: "El valor ingresado no es válido",
	tooLong: "El valor ingresado es demasiado largo",
	tooShort: "El valor ingresado es demasiado corto",
	typeMismatch: "El valor ingresado no es válido",
	valid: "",
	valueMissing: "Este campo es requerido",
}

export const VALIDITY_ERROR_KEYS = Object.keys(
	VALIDITY_ERROR_MESSAGE,
) as (keyof ValidityState)[]

export const LOGOS_BRAND_CARDS: Record<string, string> = {
	mastercard: "/cards/mastercard.svg",
	visa: "/cards/visa.svg",
	"diners/discover": "/cards/discover.jpg",
	amex: "/cards/amex.svg",
	default: "/cards/default.svg",
} as const

export const LOGOS_BRAND_CARDS_INVOICE = {
	mastercard: `${APP_HOST}/mastercard.png`,
	visa: `${APP_HOST}/visa.png`,
	"diners/discover": `${APP_HOST}/discover.png`,
	amex: `${APP_HOST}/amex.png`,
	default: `${APP_HOST}/default-card.png`,
} as const
