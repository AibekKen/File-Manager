import path from 'node:path';
import { homedir } from 'node:os';
import { handleCommands } from './command-handler.js';

const args = process.argv.slice(2)
const userName = args.find((item) => item.includes('--username')).split('=')[1]
const {stdin, stdout} = process 

process.env.currentDir =  homedir() 

stdout.write(`Welcome to the File Manager, ${userName}\nYou are currently in ${process.env.currentDir}\n`);
stdin.on('data', handleCommands)

process.on('SIGINT', () => {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
})

process.on('exit', () => {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
})

