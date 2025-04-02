import { NavLink, Outlet } from "react-router";

export function Menubar() {
    return (
        <div className="p-2 bg-white border-b 
            border-gray-400 flex gap-2 items-center">
            <div className="select-none" >MY APP</div>
            <div className="grow"></div>
            <NavLink to="/">Home</NavLink> 
            <NavLink to="/form1">Form1</NavLink> 
            <NavLink to="/form2">Form2</NavLink> 
            <NavLink to="/about">About</NavLink> 
        </div>
    )
}


export function App() {
    return (
        <div className="flex-1 flex flex-col">
            <Menubar/>
            <Outlet></Outlet>
        </div>
    )
}

