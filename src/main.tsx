import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

function Home() {
    return (
        <div className="text-4xl 
                grow flex flex-col justify-center items-center">
            Home
        </div>)
}

function About() {
    return (
        <div className="text-4xl 
            grow flex flex-col justify-center items-center">
            About
        </div>)
}

const router = createBrowserRouter([
    {
        path: "/", element: <App/>, children: [
            { path: "/", element: <Home></Home> },
            { path: "/about", element: <About></About> },
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
