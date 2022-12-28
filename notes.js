const fs = require('fs')
const chalk = require('chalk')

// load notes from file
const loadNotes = () => {
    try {
        // this wont run if file doesnt exist initially
        const notesBuffer = fs.readFileSync("./notes.json");
        const notes_JSON = notesBuffer.toString();
        const notes = JSON.parse(notes_JSON);
        return notes;
    }
    catch (error) {
        return [] // return empty file
    }
}

// save notes to file 
const saveNotes = (notes) => {
    const json_object = JSON.stringify(notes);
    fs.writeFileSync("notes.json", json_object);
}

let listNotes = () => {
    let notes = loadNotes();
    console.log(chalk.green("Your notes:"));
    notes.forEach((item) => console.log(item.title));
}

// save note to data store
const addNote = (title, body) => {
    let notes = loadNotes();
    // prevent duplicate notes
    // const duplicate_notes = notes.filter((note) => note.title == title); // traverses the entire list and returns each duplicate, not really needed for our purpose
    const duplicate_note = notes.find((note) => note.title == title); // returns when finds the first match, hence is faster

    
    // debugger - debugging tool provided by node; CLI command: node inspect [insert remaining command as usual]
    // open chrome dev tools which is like vscode debugger
    // debugger // this line is like a breakpoint

    if(duplicate_note) {
        console.log(chalk.red.inverse("note title already exists!"));
    }
    else {
        notes.push({title : title, body : body});
        saveNotes(notes);
        console.log(chalk.green.inverse("note added!"));
    }
}

// remove note from data store
const removeNote = (title) => {
    let notes = loadNotes();
    const remainingNotes = notes.filter((note) => title != note.title);
    if(remainingNotes.length == notes.length) {
        console.log(chalk.red.inverse("No note removed!"));
    }
    else {
        saveNotes(remainingNotes);
        console.log(chalk.green.inverse("Note removed!"));
    }
}

// read a note
const readNote = (title) => {
    let notes = loadNotes();
    const note = notes.find((item) => item.title === title);
    if(note) {
        console.log(chalk.white.inverse("Your note:"));
        console.log("Title: ", note.title);
        console.log("Body: ", note.body);
    }
    else {
        console.log(chalk.red("No note found!"));
    }
}

module.exports = {readNote : readNote, listNotes : listNotes, addNote : addNote, removeNote : removeNote}