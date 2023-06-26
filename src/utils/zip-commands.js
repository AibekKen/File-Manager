import { createReadStream, createWriteStream } from 'node:fs';
import * as zlib from 'zlib';
import { showCurrentDir } from './show-current-dir.js';
import { pipeline } from 'node:stream';
export const compress = (path1, path2) => {
  const readStream = createReadStream(path1, 'utf-8')
  const writeStream = createWriteStream(path2)
  const brotliCompress = zlib.createBrotliCompress();
  pipeline(readStream, brotliCompress, writeStream, (err) => {
    if (err) {
      { throw new Error('Operation failed') }
    }
    showCurrentDir()
  })
}

export const decompress = (path1, path2) => {
  const readStreamZip = createReadStream(path1);
  const writeStreamDec = createWriteStream(path2);
  const unzip = zlib.createBrotliDecompress()
  pipeline(readStreamZip, unzip, writeStreamDec, (err) => {
    if (err) {
      { throw new Error('Operation failed') }
    }
    showCurrentDir()
  })
    .on('end', () => showCurrentDir())
}