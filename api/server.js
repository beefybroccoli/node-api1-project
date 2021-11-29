const express = require("express");
const server = express();
const model = require("./users/model");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world");
});

server.get("/api/users", async (req, res) => {
  const users = await model.find();
  res.status(200).json(users);
});

server.get("/api/users/:id", async (req, res) => {
  const user = await model.findById(req.params.id);
  if (Boolean(user) === false) {
    res.status(404).json({ message: "does not exist" });
  } else {
    res.status(200).json(user);
  }
});

server.post("/api/users", async (req, res) => {
  const { bio, name } = req.body;
  if (!bio || !name) {
    res.status(400).json({ message: "provide name and bio" });
  } else {
    const result = await model.insert({ bio, name });
    if (Boolean(result) === false) {
      res.status(400).json({ message: "error insert" });
    } else {
      res.status(201).json(result);
    }
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { bio, name } = req.body;
  if (!bio || !name) {
    res.status(400).json({ message: "provide name and bio" });
  } else {
    const id = req.params.id;
    const newUser = { bio, name };
    const result = await model.update(id, newUser);
    if (Boolean(result) === false) {
      res.status(404).json({ message: "does not exist " });
    } else {
      res.status(201).json(result);
    }
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const result = await model.remove(req.params.id);
  if (Boolean(result) === false) {
    res.status(404).json({ message: "does not exist" });
  } else {
    res.status(201).json(result);
  }
});

module.exports = server;
