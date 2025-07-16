import { useParams } from 'react-router-dom'
import { Editor, type OnMount } from '@monaco-editor/react'
import { useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import { IconPlayerPlay, IconCode, IconTerminal, IconBolt } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BattlePage() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [result, setResult] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const { code } = useParams()

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const runScript = async () => {
    if (!editorRef.current) {
      return
    }

    setIsRunning(true)
    const code = editorRef.current.getValue()

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      const fn = new Function(code + '; return calcular();')
      const output = fn()
      setResult(String(output))
    } catch (err) {
      setResult('Error: ' + (err as Error).message)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col">
        {/* Battle Info and Run Button */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div 
                className="p-2 bg-yellow-500/20 rounded-lg"
                whileHover={{ rotate: 5 }}
              >
                <IconBolt className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Batalla #{code}</h2>
            </div>
            <p className="text-gray-400">Desafío de JavaScript</p>
          </motion.div>

          <motion.button
            onClick={runScript}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium transition-all duration-200 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isRunning ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isRunning ? Infinity : 0, ease: "linear" }}
            >
              <IconPlayerPlay className="w-5 h-5" />
            </motion.div>
            {isRunning ? 'Ejecutando...' : 'Ejecutar Código'}
          </motion.button>
        </motion.div>

        {/* Editor and Results Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <IconCode className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Editor de Código</h3>
            </div>

            <motion.div 
              className="flex-1 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <motion.div 
                      className="w-3 h-3 bg-red-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm ml-2">main.js</span>
                </div>
              </div>

              <div className="p-1 h-[calc(100%-41px)]">
                <Editor
                  width="100%"
                  height="100%"
                  language="javascript"
                  theme="vs-dark"
                  defaultValue={`function calcular() {\n  // Escribe tu código aquí\n  return 0;\n}`}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 1.6,
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    renderLineHighlight: 'gutter',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    automaticLayout: true,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <IconTerminal className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Resultado</h3>
            </div>

            <motion.div 
              className="flex-1 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <motion.div 
                      className="w-3 h-3 bg-red-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm ml-2">output</span>
                </div>
              </div>

              <div className="p-6 h-[calc(100%-41px)] flex flex-col">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${result.startsWith('Error:') ? 'bg-red-500' : 'bg-green-500'}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                        />
                        <span className="text-sm font-medium text-gray-400">
                          {result.startsWith('Error:') ? 'Error de ejecución' : 'Ejecutado correctamente'}
                        </span>
                      </div>

                      <motion.div 
                        className="bg-gray-900/50 rounded-lg p-4 border border-gray-600"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <pre className={`text-sm font-mono ${result.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
                          {result}
                        </pre>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex flex-col items-center justify-center h-full text-gray-500"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <IconTerminal className="w-12 h-12 mb-4 opacity-50" />
                      </motion.div>
                      <p className="text-lg font-medium mb-2">Listo para ejecutar</p>
                      <p className="text-sm text-center">
                        Escribe tu código y presiona "Ejecutar Código" para ver el resultado
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}