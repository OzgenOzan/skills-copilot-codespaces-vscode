// Create web server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Function to read file
function readFile() {
    var data = fs.readFileSync('comments.json');
    return JSON.parse(data);
}

// Function to write file
function writeFile(data) {
    fs.writeFileSync('comments.json', JSON.stringify(data));
}

// Get all comments
app.get('/comments', (req, res) => {
    var data = readFile();
    res.send(data);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    var id = req.params.id;
    var data = readFile();
    var comment = data.find(c => c.id == id);
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        res.send(comment);
    }
});

// Add new comment
app.post('/comments', (req, res) => {
    var data = readFile();
    var comment = req.body;
    comment.id = data.length + 1;
    data.push(comment);
    writeFile(data);
    res.send(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
    var id = req.params.id;
    var data = readFile();
    var comment = data.find(c => c.id == id);
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        var updatedComment = req.body;
        updatedComment.id = comment.id;
        var index = data.indexOf(comment);
        data[index] = updatedComment;
        writeFile(data);
        res.send(updatedComment);
    }
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    var id = req.params.id;
    var data = readFile();
    var comment = data.find(c => c.id == id);
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        var index = data.indexOf(comment);
        data.splice(index, 1);
        writeFile(data);
        res.send(comment);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});