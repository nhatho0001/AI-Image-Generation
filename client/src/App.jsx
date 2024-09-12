import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import CretaPost from './pages/CretaPost'
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/createPost' element = {<CretaPost />} />
      </Routes>
    </Router>
  )
}
