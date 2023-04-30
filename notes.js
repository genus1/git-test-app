import {readFileSync, writeFileSync} from 'fs'
import chalk from 'chalk'

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title) //returns false if not found

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.bold('Note title taken.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title) //returns false if not found
    /*
    const notesToKeep = notes.filter(function(note){
        return note.title !== title //returns false if not found
    })
    */
    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.bold('Note does not exist!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('My Notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.yellow(note.title))
        console.log(chalk.inverse(note.body))
    } else {
        console.log(chalk.red.inverse('Note Not Found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON =JSON.stringify(notes)
    writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBffer = readFileSync('notes.json')
        const dataJSON = dataBffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
    
}

export {addNote,removeNote, listNotes, readNote}