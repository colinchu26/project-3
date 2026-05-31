import { useState, useEffect } from "react"

export default function ParkGame({ parks, setSelected }) {
  const [pts, setPts] = useState(() =>
    parks.map(p => ({
      id: p._id,
      x: Math.random() * 380,
      y: Math.random() * 180,
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setPts(old =>
        old.map(d => ({
          ...d,
          x: (d.x + (Math.random() * 40 - 20) + 400) % 400,
          y: (d.y + (Math.random() * 30 - 15) + 200) % 200,
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