
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
    const response = await fetch("https://dummyjson.com/?limit=" 
        + encodeURIComponent(limit)
        + "&skip=" + encodeURIComponent(skip))
    const data = await response.json() as QuotesResponse
    return data
}

export function App() {
    return (
        <div className="text-4xl">Hello World</div>
    )
}

