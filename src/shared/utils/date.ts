import duration from "dayjs/plugin/duration"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/es"

dayjs.locale("es")
dayjs.extend(duration)

type OpcionesFormato = {
	diaEnMayuscula?: boolean
	mesEnMayuscula?: boolean
}

export function formatDateCapitalize(
	fecha?: string | Date | Dayjs,
	opciones: OpcionesFormato = {},
): string {
	const { diaEnMayuscula = true, mesEnMayuscula = true } = opciones

	const d = dayjs(fecha ?? new Date())
	let dia = d.format("dddd")
	let mes = d.format("MMMM")

	if (diaEnMayuscula) dia = dia.charAt(0).toUpperCase() + dia.slice(1)
	if (mesEnMayuscula) mes = mes.charAt(0).toUpperCase() + mes.slice(1)

	return `${dia} ${d.date()} de ${mes}, ${d.year()}`
}

export function calculateDateDiff(
	startDate: Date | string,
	endDate: Date | string,
): string {
	const inicio = dayjs(startDate)
	const fin = dayjs(endDate)

	const diffMs = fin.diff(inicio)

	const duracion = dayjs.duration(diffMs)

	const horas = Math.floor(duracion.asHours())
	const minutos = duracion.minutes()
	const segundos = duracion.seconds()

	return `${horas.toString().padStart(2, "0")}:${minutos
		.toString()
		.padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`
}
