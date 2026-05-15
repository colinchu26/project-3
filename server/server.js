// server.js


// start

require("dotenv").config()
const express  = require("express")
const mongoose = require("mongoose")
const cors     = require("cors")
const Park     = require("./schema/Park")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.get("/parks", async (req, res) => {
  try {
    const parks = await Park.find()
    res.json(parks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post("/parks", async (req, res) => {
  try {
    const park = new Park(req.body)
    await park.save()
    res.json(park)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put("/parks/:id", async (req, res) => {
  try {
    const park = await Park.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(park)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})


// delete - dont change this part

app.delete("/parks/:id", async (req, res) => {
  try {
    await Park.findByIdAndDelete(req.params.id)
    res.json({ message: "Park deleted" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`)
})