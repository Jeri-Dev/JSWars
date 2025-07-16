import { useNavigate } from 'react-router-dom'

export default function MainPage() {
  const navigate = useNavigate()

  return <>
    <div>

      <div className="w-full flex justify-center items-center">
        <img src='/javascript.svg' className="logo " alt="Vite logo" width={200} height={200} />

      </div>

    </div >
    <h1>JSWars</h1>
    <p>
      Bienvenido a Js Wars donde encontraras las mejores batallas de Javascript
    </p>
    <button className="mainButton mt-4" onClick={() => {
      navigate('/play/1')
    }}>Empezar</button>
  </>

}
