
import { useState } from 'react'

export function Form1() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(name, email)
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 items-start">
            <label className="mr-2">Name:
                <input
                    className="m-2"
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>Email:
                <input
                    className="m-2"
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}