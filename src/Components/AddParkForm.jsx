import { useState } from "react"

const API = "http://localhost:3001"

export default function AddParkForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "", state: "", type: "", feature: "", text: ""
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.state.trim()) return
    const res = await fetch(`${API}/parks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const newPark = await res.json()
    onAdd(newPark)
    setForm({ name: "", state: "", type: "", feature: "", text: "" })
  }

  return (
    <div className="controls">
      <h3>add a park</h3>
      {["name", "state", "type", "feature", "text"].map(field => (
        <div key={field}>
          <label>{field} </label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>add park</button>
    </div>
  )
}