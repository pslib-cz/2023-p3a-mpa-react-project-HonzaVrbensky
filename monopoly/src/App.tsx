import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import GameBoardPage from './pages/GameBoardPage';
import HomePage from './pages/HomePage';
import TutorialPage from './pages/TutorialPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<HomePage />}/>,
      <Route path="/game" element={<GameBoardPage />}/>,
      <Route path="/tutorial" element={<TutorialPage />}/>
    ]), {basename: "/2023-p3a-mpa-react-project-HonzaVrbensky/"}
)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;