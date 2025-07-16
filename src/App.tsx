import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import MainPage from './app/main'
import { Suspense } from 'react'
import BattlePage from './app/sandbox/battle'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/play/:code" element={
            <Suspense fallback={<div>Loading...</div>}>
              <BattlePage />
            </Suspense>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
