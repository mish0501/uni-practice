import './App.css'
import Greetings from './components/Greetings'

function App() {
  const userName = 'Мария'

  return (
    <div>
      <h1>Добре дошли в нашето приложение!</h1>
      <Greetings name='Иван' message='Здравей' />
      <Greetings name={userName} message='Добър ден' />
    </div>
  )
}

export default App
