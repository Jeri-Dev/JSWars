import { Pagination } from "@/contracts/API"

export const DEFAULT_PAGINATION: Pagination<any> = {
	data: [],
	metadata: {
		max: 10,
		next: false,
		page: 1,
		previous: false,
		total: 0,
		totalPages: 0,
	},
}
