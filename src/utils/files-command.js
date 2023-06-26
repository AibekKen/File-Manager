import path from 'node:path';
import { writeFile, rename, copyFile, rm } from 'node:fs/promises';
import { showCurrentDir } from './show-current-dir.js';

export const addFile = (path) => {
  let addFile = path.join(process.env.currentDir, path)
  writeFile(addFile, '').then(() => showCurrentDir(), () => { throw new Error('Operation failed') })
}

export const goRn = (path1, path2) => {
  rename(path1, path2)
    .catch(() => {throw new Error('Operation failed')})
    .finally(() => showCurrentDir())
}

export const goCopy = (path1, path2) => {
  const fileName = path1.split(path.sep).pop()
  copyFile(path1, path.join(path2, fileName))
    .catch(() => {throw new Error('Operation failed')})
    .finally(() => showCurrentDir())
}

export const moveFile =  (path1, path2) => {
  const fileToMove = path1.split(path.sep).pop()
  rename(path1, path.join(path2, fileToMove))
    .catch(() => {throw new Error('Operation failed')})
    .finally(() => showCurrentDir())
}

export const deleteFile = (path) => {
  rm(path)
  .catch(() => {throw new Error('Operation failed')})
  .finally(() => showCurrentDir())
}