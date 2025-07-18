export enum RequestStatus {
	PENDING = "PENDING",
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
}

export const RequestStatusLabels: Record<RequestStatus, string> = {
	[RequestStatus.PENDING]: "Pendiente",
	[RequestStatus.ACCEPTED]: "Aceptada",
	[RequestStatus.REJECTED]: "Rechazada",
}

export const RequestStatusColors: Record<
	RequestStatus,
	"secondary" | "success" | "error"
> = {
	[RequestStatus.PENDING]: "secondary",
	[RequestStatus.ACCEPTED]: "success",
	[RequestStatus.REJECTED]: "error",
}

export enum RequestType {
	CANCELLED_SUBSCRIPTION = "CANCELLED_SUBSCRIPTION",
}

export const RequestTypeLabels: Record<RequestType, string> = {
	[RequestType.CANCELLED_SUBSCRIPTION]: "Cancelación de suscripción",
}

export enum RequestDestination {
	MODIFIED_SUBSCRIPTION = "MODIFIED_SUBSCRIPTION",
}

export const RequestDestinationLabels: Record<string, string> = {
	[RequestDestination.MODIFIED_SUBSCRIPTION]: "Modificación de suscripción",
}
