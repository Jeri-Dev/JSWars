export enum MagicLink {
	MODIFIED_SUBSCRIPTION = "MODIFIED_SUBSCRIPTION",
	CANCELLED_SUBSCRIPTION = "CANCELLED_SUBSCRIPTION",
}

export const MagicLinkLabels: Record<MagicLink, string> = {
	[MagicLink.MODIFIED_SUBSCRIPTION]: "Modificar Suscripción",
	[MagicLink.CANCELLED_SUBSCRIPTION]: "Cancelar Suscripción",
}
