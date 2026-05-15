// commented out  lines 16-23

import { useState, useEffect } from "react"

import img1 from "./IMG_0429-001.JPG"
import bg from "./background photo.avif"
import "./App.css"

const API = "http://localhost:3001"

function Top({ title, desc, count, fav }) {
  return (
    <div
      className="top"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1>{title}</h1>
      <img src={img1} alt="park photo" />
      <p>{desc}</p>
      <div>
        <div>visited: {count}</div> 
        <div>favorite: {fav || "none"}</div> 
      </div>
      <hr />
    </div>
  )
}

function Options({ word, setWord, sort, setSort, only, setOnly }) {
  return (
    <div className="controls">
      <div>
        <label htmlFor="search">Search </label>
        <input
          id="search"
          value={word}
          onChange={e => setWord(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sort">Sort </label>
        <select id="sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="state">State</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <div>
        <label htmlFor="visited">Visited only </label>
        <input
          id="visited"
          type="checkbox"
          checked={only}
          onChange={() => setOnly(!only)}
        />
      </div>
    </div>
  )
}

function Card({ data: park, like, visit, setFav, select, save, remove }) {
  const [note, setNote] = useState(park.note || "")

  return (
    <div className="MA1card">
      <h2>{park.name}</h2>
      <p>state: {park.state}</p>
      <p>type: {park.type}</p>
      <p>{park.text}</p>
      <button onClick={() => like(park._id)}>like</button>
      <span> {park.likes} </span>
      <button onClick={() => visit(park._id)}>
        {park.visited ? "unvisit" : "visit"}
      </button>
      <button onClick={() => setFav(park.name)}>favorite</button>
      <button onClick={() => select(park._id)}>details</button>
      <button
        onClick={() => remove(park._id)}
        style={{ background: "#dc2626" }}
      >
        delete
      </button>
      <div>
        <input
          value={note}
          placeholder="note"
          onChange={e => {
            setNote(e.target.value)
            save(park._id, e.target.value)
          }}
        />
      </div>
      {note ? <p>{note}</p> : null}
      <hr />
    </div>
  )
}

function Info({ current }) {
  return (
    <div className="colinsinfobox">
      <h3>details</h3>
      {!current ? (
        <p>nothing selected</p>
      ) : (
        <div>
          <p>{current.name}</p>
          <p>state: {current.state}</p>
          <p>   type: {current.type}</p>
          <p>   {current.text}</p>
          <p>   feature: {current.feature}</p>
          <p> likes: {current.likes}</p>
          <p>visited: {current.visited ? "yes" : "no"}</p>
          <p>note: {current.note || "none"}</p>
        </div>
      )}
    </div>
  )
}

function ParkGame({ parks, setSelected }) {
  const [pts, setPts] = useState(() =>
    parks.map(p => ({
      id: p._id,
      x: Math.random()* 380,
      y: Math.random() * 180,
    }))
  )

  // numbers didnt work: 300, 450

  useEffect(() => {
    const interval = setInterval(() => {
      setPts(old =>
        old.map(d => ({
          ...d,
          x: (d.x+(Math.random()*40 - 20)+ 400) % 400,
          y: (d.y + (Math.random() * 30-15) + 200)%200,
        }))
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="game">
      {pts.map(pt => {
        const p = parks.find(a => a._id === pt.id)
        if (!p) return null
        return (
          <div
            key={pt.id}
            className="game-icon"
            onClick={() => setSelected(pt.id)}
            style={{ left: pt.x, top: pt.y }}
            title={p.name}
          >
            {p.visited ? "🏜️" : "🏞️"}
          </div>
        )
      })}
    </div>
  )
}

function AddParkForm({ onAdd }) {
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

export default function App() {
  const [parks, setParks] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("name")
  const [only, setOnly] = useState(false)
  const [favorite, setFavorite] = useState("")
  const [selected, setSelected] = useState(null)
  const [idea, setIdea] = useState("")
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    fetch(`${API}/parks`)
      .then(r => r.json())
      .then(data => setParks(data))
      .catch(err => console.error("fetch error:", err))
  }, [])

  async function likePark(id) {
    const park = parks.find(p => p._id === id)
    const updated = await fetch(`${API}/parks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: park.likes + 1 }),
    }).then(r => r.json())
    setParks(parks.map(p => (p._id === id ? updated : p)))
  }

  async function toggleVisit(id) {
    const park = parks.find(p => p._id === id)
    const updated = await fetch(`${API}/parks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visited: !park.visited }),
    }).then(r => r.json())
    setParks(parks.map(p => (p._id === id ? updated : p)))
  }

  async function saveNote(id, val) {
    const updated = await fetch(`${API}/parks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: val }),
    }).then(r => r.json())
    setParks(parks.map(p => (p._id === id ? updated : p)))
  }

  async function deletePark(id) {
    await fetch(`${API}/parks/${id}`, { method: "DELETE" })
    setParks(parks.filter(p => p._id !== id))
  }

  function handleAdd(newPark) {
    setParks([...parks, newPark])
  }

  let list = parks.filter(p => {
    const m =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.state.toLowerCase().includes(search.toLowerCase()) ||
      (p.type || "").toLowerCase().includes(search.toLowerCase())
    const v = only ? p.visited : true
    return m && v
  })

  list.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name)
    if (sort === "state") return a.state.localeCompare(b.state)
    if (sort === "likes") return b.likes - a.likes
    return 0
  })

  const visitedCount = parks.filter(p => p.visited).length
  const selectedPark = parks.find(p => p._id === selected)

  return (
    <div>
      <Top
        title="Colin's National Parks Tracker"
        desc="Track your adventures!"
        count={visitedCount}
        fav={favorite}
      />

      <Options
        word={search}
        setWord={setSearch}
        sort={sort}
        setSort={setSort}
        only={only}
        setOnly={setOnly}
      />

      <AddParkForm onAdd={handleAdd} />

      <p style={{ margin: "0 20px" }}>showing: {list.length}</p>
      <div style={{ margin: "0 20px" }}>
        {list.map(p => (
          <Card
            key={p._id}
            data={p}
            like={likePark}
            visit={toggleVisit}
            setFav={setFavorite}
            select={setSelected}
            save={saveNote}
            remove={deletePark}
          />
        ))}
      </div>

      <div style={{ margin: "20px" }}>
        <Info current={selectedPark} />
      </div>

      <hr />
      <div style={{ margin: "20px" }}>
        <h3>more park ideas</h3>
        <input
          placeholder="type a park name..."
          value={idea}
          onChange={e => setIdea(e.target.value)}
        />
        <button onClick={() => {
          if (idea.trim()) {
            setIdeas([...ideas, idea])
            setIdea("")
          }
        }}>
          add idea
        </button>
        <ul>
          {ideas.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>

      <hr />
      <div style={{ margin: "20px" }}>
        <h3>experimental park game</h3>
        <p>click an icon to select that park</p>
        <ParkGame parks={parks} setSelected={setSelected} />
      </div>
    </div>
  )
}

// alr cleaned up last 100 lines - dont need to come back