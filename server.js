const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/fsUtils");

const PORT = process.env.PORT || 3451;
const app = express();

// Must-have Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

// Our static files can be found in public folder (HTML, CSS, index.js)
app.use(express.static("public"));

// GET route for all /
app.get("/", (req, res) => {
  console.info(`${req.method} GET request received to retrieve HTML file`);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET Route for notes.html file
app.get("/notes", (req, res) => {
  console.info(
    `${req.method} request received to connect to notes.html file`
  )
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// This will read the db.json file and return all the saved notes as JSON
app.get('/api/notes', (req, res) => {
  let res = fs.readFileSync('./db/db.json');
  res = JSON.parse(response);
  res.json(res);
  console.log(res);
});

// POST request to add notes to api
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received`);
  const { title, text } = req.body;


// GET * will return the index.html file
app.get('*', (req, res) => {
  console.info(`${req.method} request is being redirected...`)  
  res.sendFile(path.join(__dirname, '/public/index.html')) //redirect to correct port
});

// Listening for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
)
