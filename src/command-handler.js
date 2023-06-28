
import path from 'node:path';
import { existsSync } from 'node:fs';
import { showCurrentDir } from './utils/show-current-dir.js';
import { showLs } from './utils/ls-command.js';
import { goUp } from './utils/up-command.js';
import { getCat } from './utils/cat-command.js';
import { getOs } from './utils/os-command.js';
import { compress, decompress } from './utils/zip-commands.js';
import { getHash } from './utils/hash-command.js';
import { addFile, deleteFile, goCopy, goRn, moveFile } from './utils/files-command.js';

export const handleCommands = (data) => {
  const commands = data.toString('utf-8').trim().split(' ')
  let command = commands[0]
  let arg1 = commands[1]
  let arg2 = commands[2]

  if (['cd', 'cat', 'rm', 'hash'].includes(command)) {
    if(!!arg1) {
      if (!path.isAbsolute(arg1)) {
        arg1 = path.join(process.env.currentDir, arg1)
      }
    } else {
      console.log('Invalid input')
      showCurrentDir()
    }
  }

  if(['rn', 'cp', 'mv', 'compress', 'decompress'].includes(command)) {
    if (!!arg2 && !!arg1) {
      if (!path.isAbsolute(arg1)) {
        arg1 = path.join(process.env.currentDir, arg1)
      } 
      if (!path.isAbsolute(arg2)) {
        arg2 =  path.join(process.env.currentDir, arg2)
      }
    } else {
      console.log('Invalid input')
      showCurrentDir()
    }
  }

  switch (commands[0]) {
    case '.exit':
      process.exit();
    case 'up':
      goUp()
      showCurrentDir()
      break;
    case 'cd':
      if(!existsSync(arg1)) throw new Error('Operation failed')
      process.env.currentDir = arg1
      showCurrentDir()
      break;
    case 'ls':
      showLs()
      break;
    case 'cat':
      getCat(arg1)
      break;
    case 'add':
      addFile(arg1)
      break;
    case 'rn':
      goRn(arg1, arg2)
      break;
    case 'cp':
      goCopy(arg1, arg2)
      break;
    case 'mv':
      moveFile(arg1, arg2)
      break;
    case 'rm':
      deleteFile(arg1)
      break;
    case 'os':
      getOs(arg1)
      showCurrentDir()    
      break;
    case 'hash':
      getHash(arg1)
      break;
    case 'compress':
      compress(arg1, arg2)
      break;
    case 'decompress': 
      decompress(arg1, arg2)
      break;
    default:
      console.log('Invalid input')
      showCurrentDir()
      break;
  }
}