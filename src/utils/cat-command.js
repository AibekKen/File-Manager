import { createReadStream } from 'node:fs';
import { showCurrentDir } from './show-current-dir.js';

export const getCat = (path) => {
  createReadStream(path, 'utf-8')
    .on('error', () => {throw new Error('Operation failed')})
    .on('end', ()=> {
      process.stdout.write('\n')
      showCurrentDir()
    })
    .pipe(process.stdout)
}