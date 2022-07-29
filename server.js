const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");

const PORT = process.env.PORT || 3451; //any number >3000 for port
const app = express();

// Must-have Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Our static files can be found in public folder (HTML, CSS, index.js)
app.use(express.static("public"));

// GET route for homepage
app.get("/", (req, res) => {
  // Logs request to the terminal
  console.info(`${req.method} request received to retrieve HTML file`);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET Route for notes.html file
app.get("/notes", (req, res) => {
  // Logs request to the terminal
  console.info(`${req.method} request received to connect to notes.html file`);
  // Client receiives notes.html file
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// This will read the db.json file and return all the saved notes as JSON
app.get("/api/notes", (req, res) => {
  // Reading db.json file
  let response = fs.readFileSync("./db/db.json");
  response = JSON.parse(response);
  res.json(response);
  console.log(response);
});

// POST request to add notes to api
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received`);
  const { title, text } = req.body;
  // If we have a title AND text
  if (title && text) {
    // Destructuring assignment for the items in req.body
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string to JSON
        const parsedNotes = JSON.parse(data);
        // We push to add a newNote
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(throwError)
              : console.info("Your note has been successfully added!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting notes");
  }
});

// DELETE
app.delete(`/api/notes/:id`, (req, res) => {
  // We first need to read all notes from the db.json file
  let notes = fs.readFileSync("./db/db.json");
  notes = JSON.parse(notes);
  const { id } = req.params;
  // Then we get rid of the note (by filtering) with the given id
  notes = notes.filter((note) => note.id !== id);
  // Lastly, we rewite the notes to the db.json file (text)
  fs.writeFile("./db/db.json", JSON.stringify(notes), (error) =>
    error ? console.error(error) : console.info("Deleted note")
  );
  res.json(notes);
});

// Redirect the user to homepage (index.html file)
app.get("*", (req, res) => {
  console.info(`${req.method} request is being redirected...`);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listening for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
