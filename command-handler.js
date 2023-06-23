import { homedir, cpus, arch, EOL } from 'node:os';

export const handleCommands = (data) => {
  const commands = data.toString('utf-8').trim().split(' ')
    switch (commands[0]) {
      case '.exit':
        process.exit();
      case 'up':
        break;
      case 'cd':
        break;
      case 'ls':
        break;
      case 'cat':
        break;
      case 'rn':
        break;
      case 'mv':
        break;
      case 'rm':
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
        break;
      case 'os':
        break;
      case 'compress':
        break;
      case 'decompress':
        break;
      default:
        console.log('Invalid input')
        break;
  }
}