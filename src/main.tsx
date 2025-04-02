import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

export function About() {
    return (
        <div className="grow flex flex-col justify-center items-center text-4xl">
            About
        </div>
    )
}

export function Main() {
    return (
        <div className="grow flex flex-col justify-center items-center text-4xl">
            Main
        </div>
    )
}

const router = createBrowserRouter([
    { path: "/", element: <App></App>, children: [
        { path: "/", element: <Main></Main> },
        { path: "/about", element: <About></About> },
    ] }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </StrictMode>,
)
