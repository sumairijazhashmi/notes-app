const validator = require('validator')
const {readNote, listNotes, removeNote, addNote} = require('./notes.js')
const yargs  = require('yargs')
const chalk = require('chalk')
const { demandOption } = require('yargs')
const fs = require('fs')
// import chalk from 'chalk';

yargs.version('1.1.0')

// create add command
yargs.command({
    command : "add",
    describe : "Add a new note",
    builder: {
        title : {
            describe: "note title",
            demandOption: true,
            type: 'string'
        },
        body : {
            describe : "note body",
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
         addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command : "remove",
    describe : "Remove a note",
    builder : {
        title : {
            describe : "title of note to remove",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }
})

// create list command
yargs.command({
    command : "list",
    describe : "List all notes",
    handler() {
        listNotes();
    }
})

// create read command
yargs.command({
    command : "read",
    describe : "Read a note",
    builder : {
        title : {
            describe : "title of note to read",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
})


// console.log(yargs.argv);
yargs.parse();

// console.log(chalk.green('Success!'));

// console.log(chalk.bold("bold text"));
// console.log(chalk.inverse("inverrrrsseee"));    

// const command = process.argv[2]
// console.log(process.argv)
// console.log(yargs.argv)
// console.log("command:", command)
// if(command == "add") {
//     // add a note
// }
// else if(command == "delete") {
//     // delete a note
// }

// let x = notes();
// console.log(x);


// console.log(validator.isEmail('example.com'));
// console.log(validator.isURL('www.google.com'));
// console.log("bruh");

// console.log(process.argv[2])