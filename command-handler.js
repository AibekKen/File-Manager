import * as zlib from 'zlib';
import { pipeline } from 'node:stream';
import { homedir, cpus, arch, EOL, userInfo } from 'node:os';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { readdir, writeFile, rename, copyFile, rm, readFile } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createHash } from 'node:crypto';

const showCurrentDir = () => console.log(`You are currently in ${process.env.currentDir}`)

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
      const pathParts = process.env.currentDir.split(path.sep);
      if (pathParts.length > 1) {
        pathParts.pop()
      }
      process.env.currentDir = pathParts.join(path.sep)
      showCurrentDir()
      break;
    case 'cd':
      if(!existsSync(arg1)) throw new Error('Operation failed')
      process.env.currentDir = arg1
      showCurrentDir()
      break;
    case 'ls':
      let result = [];
      readdir(process.env.currentDir, { withFileTypes: true }).then((dirnets) => {
        for (const dirnet of dirnets) {
          result.push({Name: dirnet.name, Type: dirnet.isFile() ? 'file' : 'directory'})
        }
        console.table(result);
        showCurrentDir()
      })
      break;
    case 'cat':
      if(!existsSync(arg1)) throw new Error('Operation failed')
      createReadStream(arg1, 'utf-8')
        .on('error', () => {throw new Error('Operation failed')})
        .on('end', ()=> {
          process.stdout.write('\n')
          showCurrentDir()
        })
        .pipe(process.stdout)
      break;
    case 'add':
      arg1 = path.join(process.env.currentDir, arg1)
      writeFile(arg1, '').then(() => showCurrentDir(), () => { throw new Error('Operation failed') })
      break;
    case 'rn':
        rename(arg1, arg2)
          .catch(() => {throw new Error('Operation failed')})
          .finally(() => showCurrentDir())
      break;
    case 'cp':
      const fileName = arg1.split(path.sep).pop()
      copyFile(arg1, path.join(arg2, fileName))
        .catch(() => {throw new Error('Operation failed')})
        .finally(() => showCurrentDir())
      break;
    case 'mv':
        const fileToMove = arg1.split(path.sep).pop()
        rename(arg1, path.join(arg2, fileToMove))
          .catch(() => {throw new Error('Operation failed')})
          .finally(() => showCurrentDir())
      break;
    case 'rm':
      rm(arg1)
        .catch(() => {throw new Error('Operation failed')})
        .finally(() => showCurrentDir())
      break;
    case 'os':
      if(arg1 === '--EOL') {
        console.log(EOL)
      } else if (arg1 === '--cpus') {
        let cpusInfo = `amount of CPUS: ${cpus().length}\n`
        cpus().forEach((cpu, i) => {
          cpusInfo += `CPU ${i+1} clock rate: ${cpu.speed/1000} GHz\n`
        })
        console.log(cpusInfo)
      } else if (arg1 === '--homedir') {
        console.log(homedir())
      } else if (arg1 === '--architecture') {
        console.log(arch())
      } else if (arg1 === '--username') {
        console.log(userInfo().username)
      } else {
        console.log('Invalid input')
      }
      showCurrentDir()    
      break;
    case 'hash':
      (async () => {
        try {
        const fileBuffer = await readFile(arg1);
        const hex = createHash('SHA256').update(fileBuffer).digest('hex');
        console.log(hex);
        } catch {
          throw new Error('Operation failed')
        } finally {
          showCurrentDir()
        }
      })()
      break;
    case 'compress':
        const readStream = createReadStream(arg1, 'utf-8')
        const writeStream = createWriteStream(arg2)
        const brotliCompress = zlib.createBrotliCompress();
        pipeline(readStream, brotliCompress, writeStream, (err) => {
          if (err) {
            { throw new Error('Operation failed') }
          }
          showCurrentDir()
        })
      break;
    case 'decompress': 
        const readStreamZip = createReadStream(arg1);
        const writeStreamDec = createWriteStream(arg2);
        const unzip = zlib.createBrotliDecompress()
        pipeline(readStreamZip, unzip, writeStreamDec, (err) => {
          if (err) {
            { throw new Error('Operation failed') }
          }
          showCurrentDir()
        })
          .on('end', () => showCurrentDir())
      break;
    default:
      console.log('Invalid input')
      showCurrentDir()
      break;
  }
}