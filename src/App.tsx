import { ReactNode } from "react"
import { Outlet, useNavigate } from "react-router"

export function Menuitem({ children, path } : { children: ReactNode, path: string}) {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(path)} className="hover:underline cursor-pointer">
            {children}
        </button>
    )
}

export function Menubar() {
    return (
        <div className="h-[60px] px-4 py-1 bg-white border-b border-gray-400 items-center flex gap-2">
            <div>ZZZ</div>
            <div className="grow" />
            <Menuitem path="/">Main</Menuitem>
            <Menuitem path="/about">About</Menuitem>
        </div>
    )
}

export function App() {
    return (
        <div className="grow flex flex-col">
            <Menubar></Menubar>
            <div className="h-1 grow flex">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

