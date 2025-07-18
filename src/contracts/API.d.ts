import { Dayjs } from "dayjs"

export interface ErrorsResponseData {
	message: string
	extra: Record<string, any>
}

interface PaginationMetadata {
	total: number
	page: number
	max: number
	next: boolean
	previous: boolean
	totalPages: number
	search?: string
}

export interface PaginationParams {
	max?: number
	page?: number
	search?: string
}
export interface Pagination<T> {
	data: T[]
	metadata: PaginationMetadata
}

export interface GlobalErrorsAPI {
	error: boolean
	messages: ErrorsResponseData[]
	status: number
}

export interface ErrorsResponseData {
	message: string
	code: string
	received: string
	expected: string
	path: string[]
	extra: Record<string, any>
}

export interface GeneralPaginationParams {
	max?: number
	page?: number
	search?: string
	startDate?: Dayjs | null
	endDate?: Dayjs | null
	orderSort?: string
}

export interface IResponse<T = unknown> {
	error: boolean
	message: string
	result: T
	auth?: {
		permission: string[]
		preferenceBranch: string
	}
}
