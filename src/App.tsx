import { ReactNode, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";

export function useStateWithLocalStorage<T>(initialValue: T, key: string) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key)
        if (storedValue) {
            return JSON.parse(storedValue)
        }
        return initialValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])
    return [ state, setState ] as const
}
        

function Box({ title = "hello", children }: { title?: string; children: ReactNode }) {
    //const [open, setOpen] = useState(true)
    const [open, setOpen] = useStateWithLocalStorage(true, "abc")
    return (
        <div className="m-4 p-4 rounded-lg bg-white shadow-xl border border-gray-300 flex flex-col gap-4">
            <div className="flex gap-1 border-b border-gray-400">
                <button onClick={() => setOpen(!open)}>
                    {open ? (
                        <MdArrowDropDown className="text-2xl" />
                    ) : (
                        <MdArrowRight className="text-2xl" />
                    )}
                </button>
                <Title>{title}</Title>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="overflow-hidden flex flex-col gap-4"
                        key="b1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Title({ children }: { children: ReactNode }) {
    return <div className="font-bold">{children}</div>;
}


function useInterval(func: () => void, intervalMs: number) {
    const [_,setTrigger] = useState(1)
    useEffect(() => {
        const id = setInterval(() => {
            func()
            setTrigger((v) => v + 1)},
            intervalMs)
            return () => clearInterval(id)
            }, [ ])
}

function useWindowSize() {
    const [ size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight})
    useEffect(() => {
        const l = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener("resize", l)
        return () => window.removeEventListener("resize", l)
    })
    return size
}
    
function useForceRerender() {
    const [_,setDummy] = useState(false)
    return () => { setDummy(d => !d) }
}
export function Clock() {
    const rerender = useForceRerender()
    useEffect(() => {
        const id = setInterval(() => {
            rerender()
        }, 1_000)
        return () => { clearInterval(id) }
    }, [])
    return (
        <div>{new Date().toTimeString()}</div>
    )
}


export function Counter() {
    const [count, setCount] = useState(1)
    useEffect(() => {
        setCount(count + 1);
    }, [])
k    return (
        <div className="flex self-start">
            <button onClick={() => {
                setCount((prev) => { return prev + 1})
                setCount((prev) => prev + 1)
                setCount(prev => prev + 1)
            }}>Count is {count}</button>
        </div>
    )
}

export function App() {
    return (
        <div className="w-[800px] flex flex-col">
            <Counter></Counter>
            <Box title="My Box 123">
                <img className="self-center h-[300px]" src="/dom.jpg" alt="dom" />
                <div className="text-sm text-gray-700">Lorem ipsum one two three.</div>
            </Box>
        </div>
    )
}

