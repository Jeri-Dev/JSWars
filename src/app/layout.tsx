import "@/shared/styles/globals.css"
import { AlertAppScreen } from '@/shared/components/screen/AlertAppScreen'
import { LoadAppScreen } from '@/shared/components/screen/LoadAppScreen'
import { MaterialUIProvider } from '@/providers/MaterialUI'
import { LoaderProvider } from '@/contexts/Loader'
import { DayjsProvider } from '@/providers/Dayjs'
import { generateCssVars } from '@/config/colors'
import { AlertProvider } from '@/contexts/Alert'
import { poppins } from '@/config/fonts'
import dayjsEs from 'dayjs/locale/es'
import { Toaster } from 'sonner'
import { Metadata } from "next"
import dayjs from 'dayjs'

export const metadata: Metadata = {
  title: "JsWars",
  description: "JsWars",
}

const cssVariables = generateCssVars()

dayjs.locale(dayjsEs)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const classNames = [
    poppins.className
  ]

  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
        <link rel="icon" type="image/png+xml" href="/jswars_logo.png" />
      </head>
      <body className={classNames.join(' ')}>
        <MaterialUIProvider>
          <AlertProvider>
            <LoaderProvider>
              <DayjsProvider>
                {children}
              </DayjsProvider>
              <LoadAppScreen />
              <AlertAppScreen />
            </LoaderProvider>
          </AlertProvider>
        </MaterialUIProvider>
        <Toaster
          richColors
          closeButton
          visibleToasts={1}
          position='top-right'
          style={{
            width: "100%",
          }}
        />
      </body>
    </html>
  )
}
