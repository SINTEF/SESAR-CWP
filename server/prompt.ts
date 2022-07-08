import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const promptPath = fileURLToPath(new URL('prompt.txt', import.meta.url));
const promptText = readFileSync(promptPath, 'utf8');

export default promptText;
