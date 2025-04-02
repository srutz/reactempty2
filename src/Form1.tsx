
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


export function useStateWithStorage<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        const raw = sessionStorage.getItem(key)
        return raw ? JSON.parse(raw) : initialValue
    })
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state))
    }, [state ])
    return [ state, setState ] as const
}


export function Form1() {
    const navigate = useNavigate()
    const [form,setForm] = useStateWithStorage("form1",{
        lastName: "",
        firstName: "",
        email: "",
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); console.log(form)
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 items-start">
            <div className="grid grid-cols-2">
                <label className="mr-2">Name:
                    <input 
                        className="m-2"
                        type="text" value={form.lastName} 
                            onChange={(e) => setForm({ ...form, lastName: e.target.value})}
                    />
                </label>
                <label className="mr-2">Firstname:
                    <input
                        className="m-2"
                        type="text"
                        value={form.firstName} 
                            onChange={(e) => setForm({ ...form, firstName: e.target.value})}
                    />
                </label>
            </div>
            <button className="button" onClick={() => navigate("/form2")}>Next part</button>
        </form>
    )
}

export function Form2() {
    const [form,setForm] = useStateWithStorage("form1",{
        lastName: "",
        firstName: "",
        email: "",
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); console.log(form)
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 items-start">
            <div className="grid grid-cols-2">
                <label>Email:
                    <input
                        className="m-2"
                        type="email" value={form.email} 
                            onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                </label>
            </div>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}