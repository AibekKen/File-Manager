import { showCurrentDir } from './show-current-dir.js';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export const getHash = async (path) => {
  try {
  const fileBuffer = await readFile(path);
  const hex = createHash('SHA256').update(fileBuffer).digest('hex');
  console.log(hex);
  } catch {
    throw new Error('Operation failed')
  } finally {
    showCurrentDir()
  }
}