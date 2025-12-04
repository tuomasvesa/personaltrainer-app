import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, Navigate, RouterProvider } from 'react-router';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList.tsx';
import Calendar from './components/Calendar.tsx';
import './index.css'
import App from './App.tsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="trainings" replace /> // default path leads to TraininingList
      },
      {
        path: "trainings",
        element: <TrainingList />
      },
      {
        path: "customers",
        element: <CustomerList />
      },
      {
        path: "calendar",
        element: <Calendar />
      }
    ]
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
