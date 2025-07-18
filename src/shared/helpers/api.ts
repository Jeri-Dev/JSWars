import { GeneralPaginationParams } from "@/contracts/API"

export const generatePaginationParams = (
	params: GeneralPaginationParams = {},
	other: Record<string, any> = {},
): Record<string, string | string[]> => {
	const { page, max, startDate, endDate, search, orderSort } = params

	const result: Record<string, string | string[]> = {}

	if (page) {
		result.page = page.toString()
	}

	if (max) {
		result.max = max.toString()
	}

	if (startDate) {
		result.startDate = startDate.toISOString()
	}

	if (endDate) {
		result.endDate = endDate.toISOString()
	}

	if (search) {
		result.search = search
	}

	if (orderSort) {
		result.orderSort = orderSort
	}

	for (const key in other) {
		if (Array.isArray(other[key])) {
			result[key] = other[key].map((item) => item.toString())
			continue
		}

		result[key] = other[key]?.toString()
	}

	return result
}
