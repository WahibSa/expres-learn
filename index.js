import express from "express";
import router from "./route.js";
const app = express();
app.use(express.json());
const port = 2000;

app.get("/", (_, res) => {
  res.send("ppp");
});

app.use("/user", router);

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  res.json({
    username: `Your username ${username}`,
    password: `Your password ${password}`,
  });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  res.json({
    username: `Your new username ${username}`,
    password: `Your new password ${password}`,
    id: id,
    message: `Data with id ${id}, successfully updated`,
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    message: `Data with id ${id}, successfully deleted`,
  });
});

// paramsValidation ->
app.delete("/book/:title/:id", (req, res) => {
  const { id, title } = req.params;
  res.json({
    id: id,
    title: title,
    message: `Book "${title}" with id ${id}, successfully deleted`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
