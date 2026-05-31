import img1 from "../IMG_0429-001.JPG"
import bg from "../background photo.avif"

export default function Top({ title, desc, count, fav }) {
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