import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import GameBoardPage from './pages/GameBoardPage';
import HomePage from './pages/HomePage';

function App() {

  const router = createBrowserRouter(
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