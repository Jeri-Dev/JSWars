import { ReactNode } from 'react'
import { IconCode, IconHome, IconSwords, IconUsers } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Inicio', icon: IconHome },
    { path: '/play/1', label: 'Batalla', icon: IconSwords },
    { path: '/friends', label: 'Amigos', icon: IconUsers },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="p-2 bg-yellow-500/20 rounded-lg"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <IconCode className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">JSWars</h1>
                <p className="text-gray-400 text-xs">JavaScript Battle Arena</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={item.path}>
                      <motion.div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="h-[calc(100vh-73px)] overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}