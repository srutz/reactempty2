import { ReactNode, useState } from "react";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

function Box({ title = "hello", children } : { title?: string, children: ReactNode}) {
    const [open, setOpen] = useState(true)
    return (
        <div className="m-4 p-4 rounded-lg bg-white shadow-xl border border-gray-300 flex flex-col gap-4">
            <div className="flex gap-1 border-b border-gray-400">
                <button onClick={() => { setOpen(!open) }}>
                    {open 
                        ? <MdArrowDropDown className="text-2xl"/> 
                        : <MdArrowRight className="text-2xl"/>}
                </button>
                <Title>{title}</Title>
            </div>
            {open && children}
        </div>
    )
}

function Title({children } : { children: ReactNode}) {
    return (
        <div className="font-bold">{children}</div>
    )    
}

export function App() {
    return (
        <Box title="My Box 123">
            <div>Lorem ipsum 123 hello again</div>
        </Box>
    )
}

