import { TYPE_MENU } from "@/shared/enums/Menu"

export interface ItemMenu {
	url: string
	title: string
	backUrl?: string
	render?: React.ReactNode
	items?: Array<ItemMenuSubItem | IItemMenuSlotted>
	preventBack?: boolean
	prenvetText?: {
		title?: string
		description?: string
	}
	permission?: string
}

interface ItemMenuSubItem {
	type?: TYPE_MENU.SUB_ITEM
	title: string
	url: string
}

interface IItemMenuSlotted {
	type: TYPE_MENU.SLOTTED
}
