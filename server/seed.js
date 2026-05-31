require("dotenv").config()
const mongoose = require("mongoose")
const Park = require("./schema/Park")
// parks same as before
// mongoose connect -

const parks = [
  { name: "Yellowstone",   state: "Wyoming",    type: "geothermal", feature: "Old Faithful",     text: "geysers and animals",              likes: 0, visited: false, note: "" },
  { name: "Yosemite",    state: "California", type: "mountain",   feature: "El Capitan",        text: "big cliffs and waterfalls",         likes: 0, visited: false, note: "" },
  { name: "Grand Canyon",  state: "Arizona",    type: "canyon",     feature: "Colorado River",    text: "huge canyon carved by water",       likes: 0, visited: false, note: "" },
  { name: "Zion",          state: "Utah",       type: "canyon",     feature: "Sandstone Cliffs",  text: "red cliffs and narrow trails",      likes: 0, visited: false, note: "" },
  { name: "Acadia",      state: "Maine",      type: "coastal",    feature: "Cadillac Mountain", text: "rocky coast and ocean views",       likes: 0, visited: false, note: "" },
  { name: "Olympic",       state: "Washington", type: "rainforest", feature: "Hoh Rain Forest",   text: "rainforest, mountains, and coast",  likes: 0, visited: false, note: "" },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Park.deleteMany({})
    await Park.insertMany(parks)
    console.log("Seeded", parks.length, "parks")
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
    mongoose.connection.close()
  })