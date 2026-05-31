/* component 1 - card


rename the classname
*/
import { useState } from "react"

export default function Card({ data: park, like, visit, setFav, select, save, remove }) {
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
        style={{ background: "#ba2929" }}
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