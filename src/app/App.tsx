import './App.scss'
import { Routes, Route } from "react-router-dom"

import { MainTablePage } from '../pages/mainTablePage/MainTablePage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainTablePage/>} />
      </Routes>
    </>
  )
}

export default App