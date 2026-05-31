export default function Options({ word, setWord, sort, setSort, only, setOnly }) {
  return (
    <div className="controls">
      <div> <label htmlFor="search">Search </label>
        <input
          id="search"
          value={word}
          onChange={e => setWord(e.target.value)}
        /> </div>


<div>
        <label htmlFor="sort">Sort </label>
        <select id="sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="name">Name</option> <option value="state">State</option> <option value="likes">Likes</option>
        </select> </div>
      <div>
        <label htmlFor="visited">Visited only </label> <input
          id="visited" type="checkbox"
          checked={only}
          onChange={() => setOnly(!only)}
        />
      </div>
    </div>
  )


}