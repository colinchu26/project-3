/* import for useState useEffect
all of the new components
iimages for each nat. park
*/
import { useState, useEffect } from "react"
import "./App.css"
import Top from "./Components/Top"
import Options from "./Components/Options"
import Card from "./Components/Card"
import Info from "./Components/Info"
import AddParkForm from "./Components/AddParkForm"
import ParkGame from "./Components/ParkGame"
import NavBar from "./Components/NavBar"
import YellowstoneImg from "./Yellowstone.jpg"
import YosemiteImg from "./Yosemite.jpg"
import GrandCanyonImg from "./GrandCanyon.jpg"
import ZionImg from "./Zion.jpg"
import AcadiaImg from "./Acadia.jpg"
import OlympicImg from "./Olympic.jpg"

const API = "http://localhost:3001"
/*API*/


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





  /*async function here */
  async function deletePark(id) {
    await fetch(`${API}/parks/${id}`, { method: "DELETE" })
    setParks(parks.filter(p => p._id !== id))
  }

  function handleAdd(newPark) {
    setParks([...parks, newPark])
  }


  /* my lists*/
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
      <NavBar />

      <div id="top"> <Top
          title="Colin's National Parks Tracker" /*project 3*/
          desc="Track your adventures!"
          count={visitedCount}
          fav={favorite}
        />
      </div>

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
      <div id="ideas" style={{ margin: "20px" }}>
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
        <ul> {ideas.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>

      <hr />
      <div id="game" style={{ margin: "20px" }}> <h3>experimental park game</h3>
        <p>click an icon to select that park</p>
        <ParkGame parks={parks} setSelected={setSelected} />
      </div>
    </div>
  )
}