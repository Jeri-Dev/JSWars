"use client"

import es from "dayjs/locale/es"
import dayjs from "dayjs"

export function DayjsProvider({ children }: { children: React.ReactNode }) {
  dayjs.locale(es)
  return children
}