import { useNavigate } from 'react-router-dom'

export default function MainPage() {
  const navigate = useNavigate()

  return <>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src='/javascript.svg' className="logo" alt="Vite logo" width={200} height={200} />
      </a>

    </div >
    <h1>JSWars</h1>
    <p className="read-the-docs">
      Bienvenido a Js Wars donde encontraras las mejores batallas de Javascript
    </p>
    <button className="mainButton" onClick={() => {
      navigate('/play/1')
    }}>Empezar</button>
  </>

}
