import { useParams } from 'react-router-dom'
import { Editor, type OnMount } from '@monaco-editor/react'
import { useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import { IconPlayerPlay, IconCode, IconTerminal } from '@tabler/icons-react'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <IconCode className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Battle #{code}</h1>
                <p className="text-gray-400 text-sm">JavaScript Challenge</p>
              </div>
            </div>
            
            <button
              onClick={runScript}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-green-500/25"
            >
              <IconPlayerPlay className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Ejecutando...' : 'Ejecutar Código'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <IconCode className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Editor de Código</h2>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
              <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">main.js</span>
                </div>
              </div>
              
              <div className="p-1">
                <Editor
                  width="100%"
                  height="500px"
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
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <IconTerminal className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Resultado</h2>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl h-[564px]">
              <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">output</span>
                </div>
              </div>
              
              <div className="p-6 h-full">
                {result ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${result.startsWith('Error:') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className="text-sm font-medium text-gray-400">
                        {result.startsWith('Error:') ? 'Error de ejecución' : 'Ejecutado correctamente'}
                      </span>
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                      <pre className={`text-sm font-mono ${result.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
                        {result}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <IconTerminal className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Listo para ejecutar</p>
                    <p className="text-sm text-center">
                      Escribe tu código y presiona "Ejecutar Código" para ver el resultado
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}