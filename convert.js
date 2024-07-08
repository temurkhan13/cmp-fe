import postmanToOpenApi from 'postman-to-openapi';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postmanCollectionPath = path.resolve(__dirname, 'cmpPostman.json');
const outputFilePath = path.resolve(__dirname, 'cmpOpenAi.yaml');

postmanToOpenApi(postmanCollectionPath, outputFilePath, { defaultTag: 'General' })
    .then(result => {
        console.log(`OpenAPI spec written to ${outputFilePath}`);
    })
    .catch(err => {
        console.error('Error converting Postman collection to OpenAPI spec:', err);
    });
