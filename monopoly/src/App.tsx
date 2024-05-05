import { useState } from 'react'
import './App.css'
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import GameBoardPage from './pages/GameBoardPage';
import HomePage from './pages/HomePage';

function App() {

  const router = createHashRouter(
    createRoutesFromElements([
      <Route path="/" element={<HomePage />}/>,
      <Route path="/game" element={<GameBoardPage />}/>
    ]),
)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;