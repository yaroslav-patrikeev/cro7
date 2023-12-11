import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path, { dirname } from 'path';
import PizZip from 'pizzip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function docxGenerator(d, users) {
  // Load the docx file as binary content
  const content = fs.readFileSync(
    path.resolve(__dirname, 'input.docx'),
    'binary',
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    date: new Date(d).toLocaleDateString('ru-RU'),
    users,
  });

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: 'DEFLATE',
  });

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
}
