import { CSSProperties, useEffect, useState } from "react"
import { cn } from "./Util"

function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}


export type Tile = {
    id: number
    index: number // index in the image (image rect)
    order: number // order in which the tiles are displayed
    rotation: number
    scale: number
    delay: number
}

export type GridImageProps = {
    imageUrl: string,
    rows?: number,
    columns?: number,
    width?: number,
    height?: number,
    gap?: number,
    className?: string,
}


export function GridImage(props: GridImageProps) {
    const {
        imageUrl,
        rows = 10,
        columns = 10,
        width = 300,
        height = 300,
        gap = 1,
        className
    } = props

    const [tiles, setTiles] = useState(Array.from(Array(rows * columns).keys()).map(i => ({
        id: i + 1,
        index: i,
        order: i,
        rotation: 0,
        scale: 1,
        delay: 0,
    } satisfies Tile)))
    const [animationStep, setAnimationStep] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            const newTiles = [...tiles]
            const order = Array.from(Array(tiles.length).keys()).map(i => i)
            const delays = Array.from(Array(tiles.length)).fill(0)
            const rotations = Array.from(Array(tiles.length)).fill(0)
            const scales = Array.from(Array(tiles.length)).fill(1)
            const funcs = [
                () => { },
                () => { shuffle(order) },
                () => { },
                () => {
                    for (let i = 0, n = delays.length; i < n; i++) {
                        const row = Math.floor(i / columns)
                        delays[i] = 20 + i * 6
                        rotations[i] = row % 2 == 0 ? 180 : -180
                    }
                },
                () => { },
                () => {  
                    const rowOrder = Array.from(Array(rows).keys()).map(i => i)
                    shuffle(rowOrder)
                    // shuffle the rows
                    for (let i = 0; i < rows; i++) {
                        const row = rowOrder[i]
                        for (let j = 0; j < columns; j++) {
                            const index = row * columns + j
                            const newIndex = i * columns + j
                            order[index] = newIndex
                        }
                    }
                },
                () => { },
                () => {
                    for (let i = 0, n = delays.length; i < n; i++) {
                        const row = Math.floor(i / columns)
                        delays[i] = 20 + i * 6
                        rotations[i] = row % 2 == 0 ? 180 : -180
                        scales[i] = 0
                    }
                },
            ]
            const step = animationStep % funcs.length
            funcs[step]()
            newTiles.forEach((tile, i) => {
                tile.order = order[i]
                tile.rotation = rotations[i]
                tile.delay = delays[i]
                tile.scale = scales[i]
            })
            setTiles(newTiles)
            setAnimationStep(animationStep + 1)
        }, 1_000)
        return () => clearInterval(timer)
    }, [animationStep])

    const containerStyle = {
        width: (width + (columns - 1) * gap) + 'px',
        height: (height + (rows - 1) * gap) + 'px',
        gap: gap + 'px',
    } satisfies CSSProperties

    const tilewidth = width / columns
    const tileheight = height / rows
    const computeTileStyle = (tile: Tile) => {
        const sx = tile.order % columns
        const sy = Math.floor(tile.order / columns)
        const tx = tile.index % columns
        const ty = Math.floor(tile.index / columns)
        const m = true
        return {
            left: m ? (sx * (tilewidth + gap)) + 'px' : (width / 2 - tilewidth / 2) + 'px',
            top: m ? (sy * (tileheight + gap)) + 'px' : (height / 2 - tileheight / 2) + 'px',
            width: tilewidth + 'px',
            height: tileheight + 'px',
            backgroundPosition: `-${tx * tilewidth}px -${ty * tileheight}px`,
            backgroundSize: `${width}px ${height}px`,
            backgroundImage: "url(" + imageUrl + ")",
            transitionDelay: tile.delay + "ms",
            transform: `rotate(${tile.rotation}deg) scale(${tile.scale})`,
        } satisfies CSSProperties
    }

    return (
        <div className={cn("relative", className)} style={containerStyle}>
            {tiles.map((tile) => (
                <div key={tile.id} 
                    className="absolute bg-no-repeat transition-all duration-250 ease-in-out transition-[cubic-bezier(1,-0.6,0.61,1.37)]" 
                    style={computeTileStyle(tile)} />
            ))}
        </div>
    )

}