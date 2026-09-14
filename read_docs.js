const fs = require('fs');
const { google } = require('googleapis');
const env = require('yaml').parse(fs.readFileSync('env.yaml', 'utf8'));

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

const docIds = [
  { id: '1lcSLwjt44KVVXfJdjxpHk-bAJ-ixzH5o3rkEvQbbRMs', name: 'artist registration page text' },
  { id: '1RbYBzsAbvjd8lgMnyvC-1vMfSp5AxXlvFb_s97qfsAg', name: 'links and website text' },
  { id: '1347NKK6W3TF3X6IxnyxQkLVqcgijqZDWuuUKVJWxE7o', name: 'links' }
];

async function readDocs() {
  for (const doc of docIds) {
    try {
      console.log(`\n========================================`);
      console.log(`READING DOC: ${doc.name}`);
      console.log(`========================================\n`);
      const res = await drive.files.export({
        fileId: doc.id,
        mimeType: 'text/plain',
      });
      console.log(res.data);
    } catch (error) {
      console.error(`Error reading ${doc.name}:`, error.message);
    }
  }
}

readDocs();
