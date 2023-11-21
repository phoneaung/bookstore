import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import ShowBooks from './pages/ShowBooks';
import EditBook from './pages/EditBook';
import DeleteBooks from './pages/DeleteBooks';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/books/:id' element={<CreateBooks />}></Route>
      <Route path='/books/:id' element={<ShowBooks />}></Route>
      <Route path='/books/:id' element={<EditBook />}></Route>
      <Route path='/books/:id' element={<DeleteBooks />}></Route>
    </Routes>
  )
}

export default App