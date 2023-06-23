import path from 'node:path';
import { homedir } from 'node:os';
import { handleCommands } from './command-handler.js';

const args = process.argv.slice(2)
const userName = args.find((item) => item.includes('--username')).split('=')[1]
const {stdin, stdout} = process 
let currentDir =  homedir() 

stdout.write(`Welcome to the File Manager, ${userName}\nYou are currently in ${currentDir}\n`);
stdin.on('data', handleCommands)
stdin.on('end', () => {
  stdout.write(`You are currently in ${currentDir}\n`);
})

process.on('SIGINT', () => {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
})

process.on('exit', () => {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
})

