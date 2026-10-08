import express from "express";
import cors from "cors";
const app = express();
app.use(cors(), express.json());
let posts = [];
let id = 1;
app.get("/posts", (_, r) => r.json(posts));
app.get("/posts/:id", (q, r) =>
  r.json({ post: posts.find((p) => p.id === Number(q.params.id)) }),
);
app.post("/posts", (q, r) => {
  posts.push({ ...q.body, id: id++, created: Date.now() });
  r.sendStatus(204);
});
app.put("/posts/:id", (q, r) => {
  posts = posts.map((p) =>
    p.id === Number(q.params.id) ? { ...p, ...q.body, id: p.id } : p,
  );
  r.sendStatus(204);
});
app.delete("/posts/:id", (q, r) => {
  posts = posts.filter((p) => p.id !== Number(q.params.id));
  r.sendStatus(204);
});
app.listen(7070, () => console.log("API http://localhost:7070"));
