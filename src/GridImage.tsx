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
    } satisfies Tile)))
    const [animationStep, setAnimationStep] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            const newTiles = [...tiles]
            const order = Array.from(Array(tiles.length).keys()).map(i => i)
            if (animationStep % 2 != 0) {
                shuffle(order)
            }
            newTiles.forEach((tile, i) => tile.order = order[i])
            setTiles(newTiles)
            setAnimationStep(animationStep + 1)
        }, 2_000)
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
            backgroundImage: "url(" + imageUrl + ")"
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