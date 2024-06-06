const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

const restaurants = [
  {
    id: 1,
    name: "dave's hot chicken",
    type: "fast food",
  },
  {
    id: 2,
    name: "la careta",
    type: "sit-in",
  },
  {
    id: 3,
    name: "let's meat",
    type: "sit-in",
  },
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/data", (req, res) => {
  res.json(restaurants);
});

app.post("/api/data", (req, res) => {
  const restaurant = {
    id: restaurants.length + 1,
    name: req.body.name,
    type: req.body.type,
  };
  restaurants.push(restaurant);
  res.send(restaurant);
});

app.put("/api/data/:id", (req, res) => {
  const restaurant = restaurants.find((c) => c.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).send("This restaurant doesn't exist");
  // find index
  const index = restaurants.findIndex((obj) => {
    return obj.id === parseInt(req.params.id);
  });
  restaurants[index] = req.body;
  res.send(restaurants);
});

app.delete("/api/data/:id", (req, res) => {
  const restaurant = restaurants.find((c) => c.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).send("This restaurant doesn't exist");

  const index = restaurants.indexOf(restaurant);
  restaurants.splice(index, 1);
  // return the same course
  res.send(restaurant);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
