export default function NavBar() {
  return (
    <nav style={{ padding: "10px 20px", background: "#1e3a2f", display: "flex", gap: "20px" }}>
      <a href="#top" style={{ color: "white" }}>Home</a>
      <a href="#game" style={{ color: "white" }}>Game</a>
      <a href="#ideas" style={{ color: "white" }}>Ideas</a>
    </nav>
  )
}