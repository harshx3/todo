import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './components/Layout.jsx'
import { TodoProvider } from './context/todoContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>
  },
  {
    path: "/list",
    element: <Layout><List /></Layout>
  },
  {
    path: "/*",
    element: <Layout><NotFound /></Layout>
  }
]);

createRoot(document.getElementById('root')).render(
  <TodoProvider>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </TodoProvider>
)
