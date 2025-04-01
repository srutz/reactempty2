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

export function QuotePanel({ quote } : { quote: Quote}) {
    return (
        <div className="rounded-lg shadow-xl bg-white p-4 m-2 flex flex-col gap-2">
            <div>{quote.quote}</div>
            <div className="self-end text-sm text-gray-600">{quote.author}</div>
        </div>
    )
}

async function delay(delayMs: number) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(true)
    }, delayMs))
} 


/**
 * Custom hook to manage and fetch quotes with pagination.
 *
 * @returns {Object} An object containing:
 * - `reload`: A function to reload the quotes.
 * - `loading`: A boolean indicating whether the quotes are currently being loaded.
 * - `quotes`: An array of quotes fetched from the API.
 * - `loadMore`: A function to load more quotes by increasing the pagination offset.
 *
 * @remarks
 * This hook uses `useState` to manage the quotes, loading state, and pagination offset.
 * It also uses `useEffect` to fetch quotes whenever the `skip` or `dummy` state changes.
 *
 * @example
 * ```tsx
 * const { quotes, loading, reload, loadMore } = useQuotes();
 *
 * useEffect(() => {
 *   if (!loading) {
 *     console.log("Quotes loaded:", quotes);
 *   }
 * }, [quotes, loading]);
 *
 * return (
 *   <div>
 *     {loading ? <p>Loading...</p> : quotes.map(q => <p key={q.id}>{q.text}</p>)}
 *     <button onClick={loadMore}>Load More</button>
 *     <button onClick={reload}>Reload</button>
 *   </div>
 * );
 * ```
 */
function useQuotes() {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [skip,setSkip] = useState(0)
    const [loading,setLoading] = useState(false)
    const [dummy,setDummy] = useState(false)
    useEffect(() => {
        (async() => {
            setLoading(true)
            try {
                const qr = await getQuotes(5, skip)
                setQuotes(qr.quotes)
            } finally {
                setLoading(false)
            }
        })()
    }, [ skip, dummy ])
    return {
        reload: () => setDummy(!dummy),
        loading: loading,
        quotes: quotes,
        loadMore: () => setSkip(skip + 5),
    }
}

export function App() {
    const { quotes, loadMore, reload } = useQuotes()
    return (
        <div className="p-4">
            {quotes.map((q) => (
                <QuotePanel quote={q} />
            ))}
            <button onClick={() => loadMore()}>Load more</button>
            <button onClick={() => reload()}>Reload</button>
        </div>
    )
}

