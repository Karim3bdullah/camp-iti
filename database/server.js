// server.js
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("mydb.json"); // قاعدة البيانات
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(jsonServer.bodyParser);

// 🟢 Middleware لتوليد ID عشوائي للـ user الجديد
server.post("/register", (req, res, next) => {
  req.body.id = Math.floor(100000 + Math.random() * 900000); // رقم عشوائي 6 digits
  next();
});

// Middlewares + Auth + Router
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log("✅ JSON Server with Auth is running on http://localhost:3000");
});
