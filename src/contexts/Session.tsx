"use client"
import { GLOBAL_TOKEN, STORAGES, GLOBAL_PERMISSIONS } from '@/config/constants'
import { createContext, useContext, useState, ReactNode } from 'react'
import { setCookies } from '@/shared/utils/cookies'
import { decodeToken } from '@/hooks/useReadToken'
import { useRouter } from 'next/navigation'
import { IUserLoggeding } from '@/interfaces/UserLoggeding'

interface SessionContextType {
  setData: (token: string) => void
  data: IUserLoggeding
  token: string
  permissions: string[]
}

export const SessionContext = createContext<SessionContextType>({
  setData: () => { },
  data: {} as IUserLoggeding,
  token: "",
  permissions: []
})

export function useSession() {
  return useContext(SessionContext)
}

interface Props {
  children: ReactNode
  payload: IUserLoggeding
  token: string
  permissions: string[]
}

export function SessionProvider({ children, payload, token, permissions }: Props) {
  if (!payload) return children

  const { push } = useRouter()
  const [data, setData] = useState(payload)

  if (typeof window !== 'undefined') {
    (window as any)[GLOBAL_TOKEN] = token;
    (window as any)[GLOBAL_PERMISSIONS] = permissions
  }


  const setDataToken = async (token: string) => {
    try {
      const payload = decodeToken(token)

      if (!payload) {
        push("/auth")
        return
      }

      setData(payload)

      await setCookies([
        {
          name: STORAGES.TOKEN,
          value: token
        },
      ])
    } catch (error) {
      console.error("Error setting token data:", error)
      push("/auth")
    }
  }



  return (
    <SessionContext.Provider
      value={{
        data: {
          ...data,
        }, setData: setDataToken,
        token,
        permissions
      }}>
      {children}
    </SessionContext.Provider>
  )
}