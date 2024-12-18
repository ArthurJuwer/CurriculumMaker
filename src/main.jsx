import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Models from './components/Models/Models.jsx'
import HeaderCV from './components/Steps/Header/HeaderCV.jsx'
import PresentationCV from './components/Steps/Presentation/PresentationCV.jsx'
import FormationCV from './components/Steps/Formation/FormationCV.jsx'
import { CurriculumProvider } from './context/CurriculumContext.jsx'
import FinalizationCV from './components/Steps/Finalization/FinalizationCV.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/models',
    element: <Models />
  },
  {
    path: '/steps/headerCV',
    element: <HeaderCV />
  },
  {
    path: '/steps/presentationCV',
    element: <PresentationCV />
  },
  {
    path: '/steps/formationCV',
    element: <FormationCV />
  },
  {
    path: '/steps/finalizationCV',
    element: <FinalizationCV />
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <CurriculumProvider>
      <RouterProvider router={router} />
    </CurriculumProvider>
  // </StrictMode>,
)
