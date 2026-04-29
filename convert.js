import postmanToOpenApi from 'postman-to-openapi';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postmanCollectionPath = path.resolve(__dirname, 'cmpPostman.json');
const outputFilePath = path.resolve(__dirname, 'cmpOpenAi.yaml');

postmanToOpenApi(postmanCollectionPath, outputFilePath, {
  defaultTag: 'General',
})
  .then(() => {})
  .catch(() => {});
