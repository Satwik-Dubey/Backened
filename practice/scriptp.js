const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.set("view engine", "ejs");

// Ensure the `files` directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// Routes
app.get("/", (req, res) => {
    // Fetch files and their contents
    const files = fs.readdirSync(filesDir).map(file => {
        const content = fs.readFileSync(path.join(filesDir, file), 'utf-8');
        return { title: file.replace('.txt', ''), content };
    });
    res.render("index", { files });
});

app.post('/create', (req, res) => {
    const { title, textarea } = req.body;
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').join(''); // Sanitize title
    const filePath = path.join(filesDir, `${sanitizedTitle}.txt`);

    fs.writeFile(filePath, textarea, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while saving the note.");
        } else {
            res.redirect('/');
        }
    });
});

app.get('/note/:title', (req, res) => {
    const filePath = path.join(filesDir, `${req.params.title}.txt`);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.send(`<h1>${req.params.title}</h1><p>${content}</p>`);
    } else {
        res.status(404).send("Note not found.");
    }
});

// Route: Edit page
app.get("/edit/:title", (req, res) => {
    const filePath = path.join(filesDir, `${req.params.title}.txt`);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.render("edit", { title: req.params.title, ncontent: content });
    } else {
        res.status(404).send("Note not found.");
    }
});

// Route: Update note
app.post("/edit/:title", (req, res) => {
    const oldTitle = req.params.title; // Title from URL
    const newTitle = req.body.ptitle; // Updated title from form
    const newContent = req.body.content; // Updated content from form

    const oldFilePath = path.join(filesDir, `${oldTitle}.txt`);
    const newFilePath = path.join(filesDir, `${newTitle}.txt`);

    // Check if the original file exists
    if (fs.existsSync(oldFilePath)) {
        // Write new content to the new file (or rename the file if the title changed)
        fs.writeFileSync(newFilePath, newContent);

        // Remove the old file if the title has changed
        if (oldTitle !== newTitle) {
            fs.unlinkSync(oldFilePath);
        }
        res.redirect('/');
    } else {
        res.status(404).send("Original note not found.");
    }
});

// Start server
app.listen(3001, () => {
    console.log("Listening on port 3001");
});


// Routes
// 1. GET / (Home Route)
// javascript
// Copy
// Edit
// app.get("/", (req, res) => {
//     const files = fs.readdirSync(filesDir).map(file => {
//         const content = fs.readFileSync(path.join(filesDir, file), 'utf-8');
//         return { title: file.replace('.txt', ''), content };
//     });
//     res.render("index", { files });
// });
// Purpose:

// Fetches all notes (files) and their contents from the filesDir directory and displays them on the homepage.
// Steps:

// fs.readdirSync(filesDir):
// Reads all filenames in the filesDir directory synchronously.
// .map(file => ...):
// Iterates over each file and:
// Reads its content (fs.readFileSync).
// Extracts the title by removing the .txt extension.
// Returns an array of objects with title and content for each file.
// res.render("index", { files }):
// Passes the array of files to the index.ejs template for rendering.
// 2. POST /create (Create a New Note)
// javascript
// Copy
// Edit
// app.post('/create', (req, res) => {
//     const { title, textarea } = req.body;
//     const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').join(''); // Sanitize title
//     const filePath = path.join(filesDir, `${sanitizedTitle}.txt`);

//     fs.writeFile(filePath, textarea, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send("An error occurred while saving the note.");
//         } else {
//             res.redirect('/');
//         }
//     });
// });
// Purpose:

// Creates a new note by writing the title and content into a text file.
// Steps:

// req.body:
// Destructures the title and textarea values submitted from the form.
// Sanitize Title:
// Removes special characters ([^a-zA-Z0-9\s]) and spaces to create a safe filename.
// fs.writeFile:
// Writes the textarea content to the file with the sanitized title.
// Error Handling:
// Logs an error and sends a response with a 500 status if writing fails.
// Redirect:
// Redirects to the home page (/) on successful creation.
// 3. GET /note/:title (View a Specific Note)
// javascript
// Copy
// Edit
// app.get('/note/:title', (req, res) => {
//     const filePath = path.join(filesDir, `${req.params.title}.txt`);
//     if (fs.existsSync(filePath)) {
//         const content = fs.readFileSync(filePath, 'utf-8');
//         res.send(`<h1>${req.params.title}</h1><p>${content}</p>`);
//     } else {
//         res.status(404).send("Note not found.");
//     }
// });
// Purpose:

// Displays the content of a specific note identified by its title.
// Steps:

// req.params.title:
// Fetches the title from the URL.
// Check File Existence:
// Uses fs.existsSync to verify if the file exists.
// Read and Respond:
// Reads the file content and sends it in an HTML response if found.
// Error Handling:
// Sends a 404 response if the file is missing.
// 4. GET /edit/:title (Edit Note Page)
// javascript
// Copy
// Edit
// app.get("/edit/:title", (req, res) => {
//     const filePath = path.join(filesDir, `${req.params.title}.txt`);
//     if (fs.existsSync(filePath)) {
//         const content = fs.readFileSync(filePath, 'utf-8');
//         res.render("edit", { title: req.params.title, ncontent: content });
//     } else {
//         res.status(404).send("Note not found.");
//     }
// });
// Purpose:

// Renders the edit page for a specific note, pre-filling its title and content.
// Steps:

// Check File Existence:
// Validates if the file exists using fs.existsSync.
// Read File:
// Reads the content of the file.
// Render Edit Page:
// Passes the title and ncontent (note content) to the edit.ejs template.
// 5. POST /edit/:title (Update Note)
// javascript
// Copy
// Edit
// app.post("/edit/:title", (req, res) => {
//     const oldTitle = req.params.title;
//     const newTitle = req.body.ptitle;
//     const newContent = req.body.content;

//     const oldFilePath = path.join(filesDir, `${oldTitle}.txt`);
//     const newFilePath = path.join(filesDir, `${newTitle}.txt`);

//     if (fs.existsSync(oldFilePath)) {
//         fs.writeFileSync(newFilePath, newContent);
//         if (oldTitle !== newTitle) {
//             fs.unlinkSync(oldFilePath);
//         }
//         res.redirect('/');
//     } else {
//         res.status(404).send("Original note not found.");
//     }
// });
// Purpose:

// Updates the title and content of an existing note.
// Steps:

// File Paths:
// Defines paths for the old and new filenames.
// Check File Existence:
// Ensures the old file exists before proceeding.
// Update File:
// Writes the updated content to a new file.
// Deletes the old file if the title has changed (fs.unlinkSync).
// Redirect:
// Redirects back to the homepage after updating.
// 6. Start Server
// javascript
// Copy
// Edit
// app.listen(3001, () => {
//     console.log("Listening on port 3001");
// });
// Purpose:

// Starts the Express server on port 3001.
// Steps:

// Prints a confirmation message to the console once the server is ready.
