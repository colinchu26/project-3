export default function Info({ current }) {
  return (
    <div className="colinsinfobox">
      <h3>details</h3>
      {!current ? (
        <p>nothing selected</p>
      ) : (
        <div>
          <p>{current.name}</p>
          <p>state: {current.state}</p>
          <p>type: {current.type}</p>
          <p>{current.text}</p>
          <p>feature: {current.feature}</p>
          <p>likes: {current.likes}</p>
          <p>visited: {current.visited ? "yes" : "no"}</p>
          <p>note: {current.note || "none"}</p>
        </div>
      )}
    </div>
  )
}