import './app.scss'

import Navbar from './Components/Navbar/Navbar'
import TaskList from './Components/TaskList/TaskList'
import { db } from '../Mock'

function App() {
  return (
    <>
      <Navbar/>
      <TaskList data={db}/>
    </>
  )
}

export default App
