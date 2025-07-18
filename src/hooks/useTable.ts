import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { GENERAL_INTEGRATION_ERROR_MESSAGE } from "@/config/constants"
import { DEFAULT_PAGINATION } from "@/shared/default/Pagination"
import { generatePaginationParams } from "@/shared/helpers/api"
import { BASE_API_URL } from "@/config/enviroments"
import { GLOBAL_TOKEN } from "@/config/constants"
import { useLoader } from "@/contexts/Loader"
import { Pagination } from "@/contracts/API"
import { useDelay } from "@/hooks/useDelay"
import { useRouter } from "next/navigation"
import { API } from "@/config/api"
import { toast } from "sonner"
import { Dayjs } from "dayjs"
import dayjs from "dayjs"

export interface Filters
	extends Partial<
		Record<string, string | string[] | Dayjs | Date | number | null | boolean>
	> {
	page?: number
	max?: number
	startDate?: Date | null | Dayjs
	startHour?: Date | null | Dayjs
	endHour?: Date | null | Dayjs
	endDate?: Date | null | Dayjs
	search?: string
	orderSort?: SortOrder
}

interface Params<T> {
	endpoint: string
	exportEndpoint?: string
	initialFilters?: Filters
	initialState?: Pagination<T>
	skipInitialFetch?: boolean
	paramsExport?: Record<string, string>
}

export type SortOrder = "asc" | "desc"

const createCache = <T>() => {
	const cache = new Map<string, Pagination<T>>()

	return {
		get: (key: string) => cache.get(key),
		set: (key: string, value: Pagination<T>) => cache.set(key, value),
		has: (key: string) => cache.has(key),
		clear: () => cache.clear(),
	}
}

export const useTable = <T>(config: Params<T>) => {
	const {
		endpoint,
		initialFilters = {},
		initialState = DEFAULT_PAGINATION,
		skipInitialFetch = true,
		exportEndpoint = `${config.endpoint}/export`,
		paramsExport = {},
	} = config

	if (!endpoint) {
		throw new Error("Endpoint is required")
	}

	const router = useRouter()
	const tableCache = useMemo(() => createCache<T>(), [])

	const [checkItems, setCheckItems] = useState<Array<string | number>>([])
	const [pagination, setPagination] = useState<Pagination<T>>(initialState)
	const [filters, setFilters] = useState<Filters>(initialFilters)
	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [reloading, setReloading] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const hasFirstFetchOccurred = useRef(skipInitialFetch)

	const { setLoading: setLoad } = useLoader()

	const { GET } = API

	const queryParams = useMemo(() => {
		const adjustedFilters = {
			...filters,
			startDate: filters.startDate ? dayjs(filters.startDate) : undefined,
			endDate: filters.endDate ? dayjs(filters.endDate) : undefined,
		}

		const {
			endDate: _endDate,
			startDate: _startDate,
			max: _max,
			orderSort: _orderSort,
			page: _page,
			search: _search,
			...others
		} = adjustedFilters

		return generatePaginationParams(adjustedFilters, others)
	}, [filters])

	const handleSearch = (search: string) => {
		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current)
		}

		searchTimeoutRef.current = setTimeout(() => {
			tableCache.clear()
			setFilters((prev) => ({ ...prev, search, page: 1 }))
		}, 800)
	}

	const handleChangePage = useCallback((page: number) => {
		setFilters((prev) => ({ ...prev, page: page }))
	}, [])

	const handleChangeRowsPerPage = useCallback((rowsPerPage: number) => {
		setFilters((prev) => ({ ...prev, max: rowsPerPage, page: 1 }))
	}, [])

	const handleSort = useCallback((order: SortOrder) => {
		setFilters((prev) => ({ ...prev, orderSort: order }))
	}, [])

	const handleSetEndDate = useCallback((date: Dayjs | Date | string | null) => {
		if (!date) {
			setFilters((prev) => ({ ...prev, endDate: undefined }))
			return
		}

		const endDate = dayjs(date).isValid() ? dayjs(date) : undefined
		setFilters((prev) => ({ ...prev, endDate }))
	}, [])

	const handleSetStartDate = useCallback(
		(date: Dayjs | Date | string | null) => {
			if (!date) {
				setFilters((prev) => ({ ...prev, startDate: undefined }))
				return
			}

			const startDate = dayjs(date).isValid() ? dayjs(date) : undefined
			setFilters((prev) => ({ ...prev, startDate }))
		},
		[],
	)

	const handleChangeCheckedItems = useCallback(
		(items: Array<string | number>) => {
			setCheckItems(items)
		},
		[],
	)

	const reload = useCallback(() => {
		setReloading((prev) => prev + 1)
		tableCache.clear()
	}, [])

	const fetchData = useCallback(async (): Promise<() => void> => {
		const controller = new AbortController()

		setIsLoading(true)
		setLoad(true)

		try {
			const cacheKey = JSON.stringify(filters)
			const cachedResult = tableCache.get(cacheKey)

			if (cachedResult) {
				setPagination(cachedResult)
				return () => {}
			}

			await useDelay(600)

			const response = await GET<Pagination<T>>({
				url: endpoint,
				query: queryParams,
				signal: controller.signal,
			})

			if (!response.ok) {
				toast.error(response.error?.messages[0].message)
				setError(true)
				return () => {}
			}

			tableCache.set(cacheKey, response.data.result)
			setPagination(response.data.result)

			if (error) {
				setError(false)
			}

			return () => controller.abort()
		} catch (error: any) {
			if (error.name !== "AbortError") {
				setError(true)
				toast.error(GENERAL_INTEGRATION_ERROR_MESSAGE)
			}

			return () => {}
		} finally {
			setIsLoading(false)
			setLoad(false)
		}
	}, [endpoint, filters, queryParams, error, tableCache])

	const handleExport = useCallback(async () => {
		setLoad(true)

		const token = (globalThis as any)[GLOBAL_TOKEN]
		const itemsIds =
			checkItems.length > 0
				? checkItems.map((item) => `ids=${item}`).join("&")
				: ""
		const searchParams = new URLSearchParams(paramsExport)
		const url = `${BASE_API_URL}${
			exportEndpoint || endpoint
		}?${itemsIds}&${searchParams}`

		await useDelay(500)

		try {
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				toast.error(GENERAL_INTEGRATION_ERROR_MESSAGE)
				return
			}

			const fileName =
				response.headers.get("Content-Disposition")?.split("filename=")[1] ||
				"export.xlsx"
			const blob = await response.blob()
			const urlBlob = URL.createObjectURL(blob)

			const anchor = document.createElement("a")
			anchor.href = urlBlob
			anchor.download = fileName
			document.body.appendChild(anchor)
			anchor.click()

			document.body.removeChild(anchor)
			URL.revokeObjectURL(urlBlob)

			toast.success("Exportación exitosa")
		} catch {
			toast.error(GENERAL_INTEGRATION_ERROR_MESSAGE)
		} finally {
			setLoad(false)
		}
	}, [checkItems])

	const clearCache = useCallback(() => {
		tableCache.clear()
	}, [])

	const clearFilters = useCallback(() => {
		setFilters({
			page: 1,
			max: 10,
		})
	}, [])

	useEffect(() => {
		if (isInitialLoad) {
			setIsInitialLoad(false)
			return
		}

		if (!hasFirstFetchOccurred.current) {
			hasFirstFetchOccurred.current = true
			return
		}

		if (error) return

		let cleanup: () => void

		const runFetch = async () => {
			try {
				cleanup = await fetchData()
			} catch (error) {
				console.error("Error en fetchData:", error)
			}
		}

		runFetch()

		return () => {
			if (cleanup) {
				cleanup()
			}
		}
	}, [filters, reloading, error, router])

	return {
		error,
		filters,
		isLoading,
		pagination,
		checkItems,
		reload,
		clearCache,
		handleSort,
		setFilters,
		handleExport,
		handleSearch,
		handleChangePage,
		handleSetEndDate,
		handleSetStartDate,
		handleChangeRowsPerPage,
		handleChangeCheckedItems,
		setPagination,
		clearFilters,
	}
}
