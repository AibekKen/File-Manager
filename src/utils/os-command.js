import { homedir, cpus, arch, EOL, userInfo } from 'node:os';

export const getOs = (flag) => {
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
  } else if (flag === '--architecture') {
    console.log(arch())
  } else if (flag === '--username') {
    console.log(userInfo().username)
  } else {
    console.log('Invalid input')
  }
}