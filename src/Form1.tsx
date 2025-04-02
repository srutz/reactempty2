
import { useState } from 'react'

export function Form1() {
    const [form,setForm] = useState({
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