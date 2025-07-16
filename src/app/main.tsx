import { useNavigate } from 'react-router-dom'

export default function MainPage() {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full flex justify-center items-center mb-8">
          <img src='/javascript.svg' className="logo" alt="JavaScript logo" width={200} height={200} />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">JSWars</h1>
        <p className="text-gray-400 text-center mb-8 max-w-md">
          Bienvenido a Js Wars donde encontrarás las mejores batallas de Javascript
        </p>
        
        <button 
          className="mainButton mt-4" 
          onClick={() => navigate('/play/1')}
        >
          Empezar
        </button>
      </div>
    </div>
  )
}
