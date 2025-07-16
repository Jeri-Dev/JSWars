import { useParams } from 'react-router-dom'
import styles from '@/modules/sandbox/sandbox.module.css'
import { Editor, type OnMount, } from '@monaco-editor/react'
import { useRef, useState } from 'react'
import * as monaco from 'monaco-editor'


export default function BattlePage() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [result, setResult] = useState('')
  const { code } = useParams()

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const runScript = () => {
    if (!editorRef.current) {
      return
    }

    const code = editorRef.current.getValue()
    try {
      const fn = new Function(code + '; return calcular();')
      const output = fn()
      setResult(String(output))
    } catch (err) {
      setResult('Error: ' + err)
    }
  }

  return (
    <div>
      <p style={{
        fontSize: '2em',
      }}>battle {code}</p>

      <button onClick={runScript}>Run</button>

      <div style={{
        display: 'flex',
        gap: '10px',
      }}>
        <div className={styles.mainEditor}>
          <Editor
            width={'500px'}
            height={'500px'}
            language="javascript"
            theme="vs-dark"
            defaultValue={`function calcular() {\n  return 0;\n}`}
            onMount={handleEditorDidMount}

          />
        </div>
        <div style={{ padding: '10px', borderTop: '1px solid #ccc', background: '#0e0e0e', width: '500px' }}>
          <strong>Resultado:</strong>
          <pre color='white'>{result}</pre>
        </div>
      </div>
    </div>
  )
}
