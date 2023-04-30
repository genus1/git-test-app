import chalk from 'chalk'

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

import {addNote, removeNote, listNotes, readNote} from './notes.js'

//parse commands 
yargs(hideBin(process.argv)).command({
    command:'add',
    describe:'Add Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type : 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type : 'string'
        }
    },
    handler(argv){
        addNote(argv.title, argv.body)
    }
}).command({
    command:'remove',
    describe:'Remove Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type : 'string'
        }
    },
    handler(argv){
        removeNote(argv.title)
    }
}).command({
    command:'list',
    describe:'List Notes',
    handler(){
        listNotes()
    }
}).command({
    command:'read',
    describe:'Read Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type : 'string'
        }
    },
    handler(argv){
        readNote(argv.title)
    }
}).parse()


//console.log(yargs(process.argv.slice(2)).argv)