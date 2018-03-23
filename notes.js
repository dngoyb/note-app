const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('note-data.json');
        return JSON.parse(notesString);
    }catch (e){
        return [];
    }

}

var saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getNote = (title) => {
    var notes = fetchNotes();
    var checkNote = notes.filter((note) => note.title === title);
    return checkNote[0];
};

var getAll = () => {
    return fetchNotes();
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var checkNote = notes.filter((note) => note.title !== title);
    saveNotes(checkNote);
    return notes.length !== checkNote.length;
};

var logNote = (note) => {
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`)
}



module.exports = {
    addNote,
    getNote,
    getAll,
    removeNote,
    logNote
};
