// EaseInOut.tsx
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function EaseInOut({ children }: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: '100%',
        }}
        transition={{ ease: 'easeInOut', duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}