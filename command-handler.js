import { homedir, cpus, arch, EOL } from 'node:os';
import path from 'node:path';
import { existsSync } from 'node:fs';
const showCurrentDir = () => console.log(`You are currently in ${process.env.currentDir}`)

export const handleCommands = (data) => {
  const commands = data.toString('utf-8').trim().split(' ')
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
        let pathTo = commands[1]
        console.log(pathTo)
        if(!!pathTo) {
          if (!path.isAbsolute(pathTo)) {
            pathTo = path.join(process.env.currentDir, pathTo)
          }
          if(!existsSync(pathTo)) throw new Error('Operation failed')
          process.env.currentDir = pathTo
        } else {
          console.log('Invalid input')
        }
        showCurrentDir()
        break;
      case 'ls':
        showCurrentDir()
        break;
      case 'cat':
        showCurrentDir()
        break;
      case 'rn':
        showCurrentDir()
        break;
      case 'mv':
        showCurrentDir()
        break;
      case 'rm':
        showCurrentDir()
        break;
      case 'os':
        const flag = commands[1]
        if(flag === '--EOL') {
          console.log(EOL)
        } else if (flag === '--cpus') {
          let cpusInfo = `amount of CPUS: ${cpus().length}\n`
          cpus().forEach((cpu, i) => {
            cpusInfo += `CPU ${i+1} clock rate: ${cpu.speed/1000} GHz\n`
          })
          console.log(cpusInfo)
        } else if (flag === '--homedir') {
          console.log(homedir())
        } else if(flag === '--architecture') {
          console.log(arch())
        } else {
          console.log('Invalid input')
        }
        showCurrentDir()    
        break;
      case 'compress':
        showCurrentDir()
        break;
      case 'decompress':
        showCurrentDir()
        break;
      default:
        console.log('Invalid input')
        showCurrentDir()
        break;
  }
}