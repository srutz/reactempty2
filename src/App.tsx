import { useEffect, useState } from "react"



export function useWindowSize() {
    const [size, setSize] = useState({ 
        width: window.innerWidth,
        height: window.innerHeight
    })
    useEffect(() => {
        console.log("mounting sizedisplay")
        const l = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener("resize", l)
        return () => {
            console.log("unmounted sizedisplay")
            window.removeEventListener("resize", l)
        }
    }, [])
    return size
}

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false)
    useEffect(() => {
        const l = () => {
            setIsFullscreen(document.fullscreenElement !== null)
        }
        document.addEventListener("fullscreenchange", l)
        l()
        return () => {
            document.removeEventListener("fullscreenchange", l)
        }
    }
    , [])
    return isFullscreen
}




export function SizeDisplay() {
    console.log("rerender")
    const size = useWindowSize()
    return (
        <div id="x">{size.width} x {size.height}
            {size.height > 400 && "HOCH"}</div>
    )
}

export function Greeting({ title } : { title: string }) {
    const size = useWindowSize()
    return (
        size.height > 400 
            ? <div className="text-4xl">{title}</div>
            : <div>{title}</div>
    )
}

export function App() {
    return (
        <div className="">
            <Greeting title="Hello Hello" />
            <SizeDisplay />
        </div>
    )
}

