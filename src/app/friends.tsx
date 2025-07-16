import { motion } from 'framer-motion'
import { IconUsers, IconUserPlus, IconTrophy } from '@tabler/icons-react'

export default function FriendsPage() {
  const friends = [
    { id: 1, name: "Alex Rodriguez", status: "online", score: 1250 },
    { id: 2, name: "Maria Garcia", status: "offline", score: 980 },
    { id: 3, name: "Carlos Lopez", status: "online", score: 1450 },
  ]

  return (
    <div className="h-full p-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-blue-500/20 rounded-lg"
              whileHover={{ rotate: 5 }}
            >
              <IconUsers className="w-6 h-6 text-blue-400" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white">Amigos</h1>
              <p className="text-gray-400">Conecta con otros desarrolladores</p>
            </div>
          </div>

          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconUserPlus className="w-4 h-4" />
            Agregar Amigo
          </motion.button>
        </motion.div>

        {/* Friends List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {friend.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{friend.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                      <span className="text-sm text-gray-400 capitalize">{friend.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-yellow-400">
                  <IconTrophy className="w-4 h-4" />
                  <span className="font-semibold">{friend.score}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {friends.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <IconUsers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tienes amigos aún</h3>
            <p className="text-gray-500">Agrega amigos para competir y compartir desafíos</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}