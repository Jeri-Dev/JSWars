import { ReactNode } from 'react'
import { IconCode } from '@tabler/icons-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Header */}
      <header className="border-b border-gray-700 bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <IconCode className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">JSWars</h1>
              <p className="text-gray-400 text-sm">JavaScript Battle Arena</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}