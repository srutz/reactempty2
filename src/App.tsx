import { useEffect, useState } from "react"

// https://pastebin.stepanrutz.com/pastebin/pastes/CdSWShz3

export type Quote = {
    quote: string
    author: string
    id: number
}

export type QuotesResponse = {
    quotes: Quote[]
    total: number
    skip: number
    limit: number
}

export async function getQuotes(limit: number, skip: number) {
    const response = await fetch("https://dummyjson.com/quotes"
        + "?limit=" + encodeURIComponent(limit)
        + "&skip=" + encodeURIComponent(skip))
    const data = await response.json() as QuotesResponse
    return data
}

export function App() {
    const [quotes, setQuotes] = useState<Quote[]>([])
    useEffect(() => {
        (async() => {
            const qr = await getQuotes(5, 2)
            setQuotes(qr.quotes)
        })()
    }, [])
    return (
        <div><pre>{JSON.stringify(quotes, null, 4)}</pre></div>
    )
}

