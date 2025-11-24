import express from "express";

const app = express();
app.use(express.json()); // to read JSON body

// Temporary in-memory storage (reset on every restart)
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" }
];

// ============================
//       CRUD ROUTES
// ============================
app.get("/", (req, res) => {
    res.json({
      message: "Hello from the Home Route!",
      status: "OK"
    });
  });
  
// READ all items
app.get("/items", (req, res) => {
  res.json(items);
});

// READ single item
app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) return res.status(404).json({ message: "Item not found" });

  res.json(item);
});

// CREATE new item
app.post("/items", (req, res) => {
  const { name } = req.body;

  const newItem = {
    id: Date.now(), // quick unique ID
    name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE an item
app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = name;
  res.json(item);
});

// DELETE an item
app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items.splice(index, 1);
  res.json({ message: "Item deleted" });
});

// ============================

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
