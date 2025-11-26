import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList.tsx';
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "trainings",
        element: <TrainingList />
      },
      {
        path: "customers",
        element: <CustomerList />
      }
    ]
  },


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
