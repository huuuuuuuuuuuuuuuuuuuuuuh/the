import { access, constants, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const requiredFiles = ['index.html', 'sw.js'];

async function verify() {
  for (const fileName of requiredFiles) {
    const filePath = path.join(root, fileName);
    await access(filePath, constants.R_OK);
    const content = await readFile(filePath, 'utf8');
    if (!content || content.trim().length === 0) {
      throw new Error(`${fileName} is empty.`);
    }
  }

  console.log('Package verification succeeded: required static files exist and are non-empty.');
}

try {
  await verify();
} catch (error) {
  console.error('Package verification failed.');
  console.error(error.message);
  process.exit(1);
}
