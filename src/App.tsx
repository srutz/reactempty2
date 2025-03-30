import { Box } from "./Box";
import { GridImage } from "./GridImage";
import { useWindowSize } from "./WindowSize";

export function App() {
    const { height: windowHeight  } = useWindowSize()
    const size = Math.min(890, windowHeight * 0.75)
    return (
        <Box className="m-8">
            <div className="self-center text-[80px] leading-tight uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-green-500">
                Gridimage
            </div>
            <GridImage className="self-center" imageUrl="/notredame.jpg" width={size} height={size}/>
        </Box>
    )
}

