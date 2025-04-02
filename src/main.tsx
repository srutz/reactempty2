import React, { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { createBrowserRouter, RouterProvider, useLoaderData, useSearchParams } from 'react-router'
import * as motion from "motion/react-client"
import { Form1 } from './Form1.tsx'

function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="overflow-hidden grow flex flex-col p-2">{children}</motion.div>
    )
}

function Home() {
    return (
        <PageWrapper>
            <div className="text-4xl 
                overflow-hidden
                grow flex flex-col justify-center items-center">
                Home
            </div>
        </PageWrapper>
    )
}

function About() {
    return (
        <PageWrapper>
            <div className="
            overflow-hidden
            grow flex flex-col justify-center items-center">
                About
            </div>
        </PageWrapper>
    )
}

export type Quote = { quote: string, author: string, id: number }

const router = createBrowserRouter([
    {
        path: "/", 
        element: <App />, 
        children: [
            { 
                path: "/", 
                element: <Home></Home>,
            },
            { 
                path: "/form1", 
                element: <Form1/>,
            },
            { 
                path: "/about", 
                element: <About></About>
            },
            {
                path: "*",
                element: <div className="grow">Not foudn</div>
            }
        ],
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
