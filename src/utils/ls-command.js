import { showCurrentDir } from './show-current-dir.js';
import { readdir } from 'node:fs/promises'

export const showLs = () => {
  let result = [];
  readdir(process.env.currentDir, { withFileTypes: true }).then((dirnets) => {
    for (const dirnet of dirnets) {
      result.push({Name: dirnet.name, Type: dirnet.isFile() ? 'file' : 'directory'})
    }
    console.table(result);
    showCurrentDir()
  })
}