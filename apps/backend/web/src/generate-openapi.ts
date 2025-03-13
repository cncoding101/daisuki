import openApiDoc from './openapi';
import * as fs from 'fs';

fs.writeFileSync('openapi.json', JSON.stringify(openApiDoc, null, 2), 'utf8');

console.log('🚀 Generating openapi spec 🚀 \n', JSON.stringify(openApiDoc, null, 2));
