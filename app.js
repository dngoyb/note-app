const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOption = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

var bodyOption = {
  describe: 'The body of the note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'add a new note', {
    title: titleOption,
    body: bodyOption
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOption
  })
  .command('remove', 'Removing a note', {
    title: titleOption
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add'){
 var note = notes.addNote(argv.title, argv.body);
 if (note) {
   console.log('Note Created');
   notes.logNote(note);
 }else {
   console.log('Note title taken');
 }
}else if (command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`)
  allNotes.forEach((note) => notes.logNote(note));
}else if (command === 'read'){
  var note = notes.getNote(argv.title);
  if (note){
    console.log("Note found");
    notes.logNote(note);
  }else {
    console.log("Note doesnt exist");
  }
}else if (command === 'remove') {
  var note = notes.removeNote(argv.title);
  var message = note ? "Note was removed" : "Note not found"; 
  console.log(message);
}else {
  console.log("command not recognized");
}