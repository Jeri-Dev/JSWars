import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconPlayerPlay, IconTrophy, IconCode } from '@tabler/icons-react'

export default function MainPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: IconCode,
      title: "Desafíos JavaScript",
      description: "Resuelve problemas de programación únicos"
    },
    {
      icon: IconTrophy,
      title: "Competencias",
      description: "Compite contra otros desarrolladores"
    },
    {
      icon: IconPlayerPlay,
      title: "Práctica Continua",
      description: "Mejora tus habilidades día a día"
    }
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div 
        className="text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.img 
            src='/javascript.svg' 
            className="mx-auto" 
            alt="JavaScript logo" 
            width={120} 
            height={120}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
        
        {/* Title */}
        <motion.h1 
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          JSWars
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Bienvenido a JS Wars donde encontrarás las mejores batallas de JavaScript. 
          Pon a prueba tus habilidades y conviértete en un maestro del código.
        </motion.p>
        
        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* CTA Button */}
        <motion.button 
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => navigate('/play/1')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Comenzar Batalla
        </motion.button>
      </motion.div>
    </div>
  )
}