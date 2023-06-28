import path from 'node:path';

export const goUp = () => {
  const pathParts = process.env.currentDir.split(path.sep);
  if (pathParts.length > 1) {
    pathParts.pop()
  }
  process.env.currentDir = pathParts.join(path.sep)
}
