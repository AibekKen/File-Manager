const args = process.argv.slice(2)
const userName = args.find((item) => item.includes('--username')).split('=')[1]
const {stdin, stdout} = process

stdout.write(`Welcome to the File Manager, ${userName}\n`);
stdin.on('data', (data) => {
  if (data.toString('utf-8').trim() === '.exit') {
    process.exit();
  }
})

process.on('SIGINT', () => {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
})

