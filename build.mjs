import { access, constants } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const requiredFiles = ['index.html', 'sw.js'];

async function ensureFileExists(fileName) {
  const fullPath = path.join(root, fileName);
  await access(fullPath, constants.R_OK);
  return fullPath;
}

try {
  await Promise.all(requiredFiles.map(ensureFileExists));
  console.log('Build succeeded: static carrier files are present and readable.');
} catch (error) {
  console.error('Build failed: missing required static file(s).');
  console.error(error.message);
  process.exit(1);
}
