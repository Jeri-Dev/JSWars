"use client"

import { createContext, useContext, useState } from 'react'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

interface IConfigAlert {
  type: AlertType
  title: string
  message: string
  allowCancel?: boolean
  preventClose?: boolean
  onCancel?: () => void
  onAccept?: () => void
}

interface IAlertContext {
  open: boolean
  config: IConfigAlert | null
  openAlert: (config: IConfigAlert) => void
  closeAlert: () => void
}

const INITIAL_STATE: IAlertContext = {
  open: false,
  config: null,
  openAlert: () => { },
  closeAlert: () => { },
}

const AlertContext = createContext<IAlertContext>(INITIAL_STATE)

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<IConfigAlert | null>(null)
  const [open, setOpen] = useState(true)

  const openAlert = (config: IConfigAlert) => {
    setConfig(config)
    setOpen(true)
  }

  const closeAlert = () => {
    setOpen(false)
    setConfig(null)
  }

  return (
    <AlertContext.Provider value={{ open, config, openAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}


export const useAlert = () => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }

  return context
}